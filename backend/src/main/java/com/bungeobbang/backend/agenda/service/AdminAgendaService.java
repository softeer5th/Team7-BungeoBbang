package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.repository.AdminAgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaImageRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.AdminAgendaSubResult;
import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AdminAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinder;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinders;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.bungeobbang.backend.common.exception.ErrorCode.*;

/**
 * 🔹 관리자 "답해요" 서비스
 * <p>
 * - "답해요" 채팅방 관리 서비스.
 * - 답해요 생성, 수정, 종료, 삭제 기능 제공.
 * - 관리자(Admin) 권한으로 관리.
 * </p>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAgendaService {
    private final AgendaFinders agendaFinders;
    private final AdminRepository adminRepository;
    private final AgendaRepository agendaRepository;
    private final AgendaImageRepository agendaImageRepository;
    private final AdminAgendaChatRepository adminAgendaChatRepository;
    private final AgendaChatRepository agendaChatRepository;

    private final BadWordService badWordService;

    /**
     * 특정 관리자(Admin)가 속한 대학교의 안건(Agenda)을 상태별로 조회합니다.
     *
     * <h3>기능 설명:</h3>
     * <ul>
     *   <li>관리자 ID(adminId)를 이용하여 관리자 정보를 검증합니다.</li>
     *   <li>주어진 상태(status)에 따라 적절한 조회 전략을 선택합니다.</li>
     *   <li>선택된 조회 전략(AgendaFinder)을 사용하여 상태별 안건 목록을 조회합니다.</li>
     * </ul>
     *
     * <h3>예외 발생:</h3>
     * <ul>
     *   <li>{@code AdminException} - 관리자 정보가 존재하지 않을 경우</li>
     * </ul>
     *
     * @param adminId  조회를 요청한 관리자 ID
     * @param status   조회할 안건 상태 (진행 전, 진행 중, 완료 등)
     * @param endDate  마지막으로 조회된 안건의 종료 날짜 (무한 스크롤 시 사용)
     * @param agendaId 마지막으로 조회된 안건의 ID (무한 스크롤 시 사용 중복)
     * @return 상태에 맞는 안건 목록 (List of {@link AgendaResponse})
     * @throws AdminException 관리자 정보가 존재하지 않을 경우 발생
     */
    @Transactional(readOnly = true)
    public List<AdminAgendaResponse> getAgendasByStatus(Long adminId, AgendaStatusType status, LocalDate endDate, Long agendaId) {
        final Admin admin = getAdmin(adminId);
        final AgendaFinder finder = agendaFinders.mapping(status);
        final List<AgendaResponse> agendaList = finder.findAllByStatus(admin.getUniversity().getId(), endDate, agendaId);

        final Map<Long, AdminAgendaSubResult> unreadStatus = adminAgendaChatRepository.findUnreadStatus(
                agendaList.stream().map(AgendaResponse::agendaId).toList(),
                adminId);
        return agendaList.stream()
                .map(agenda -> new AdminAgendaResponse(
                        agenda,
                        unreadStatus.get(agenda.agendaId()).hasNewMessage(),
                        unreadStatus.get(agenda.agendaId()).lastReadChatId()))
                .collect(Collectors.toList());
    }

    private static void validAdminWithAgenda(final Admin admin, final Agenda agenda) {
        if (!admin.getUniversity().equals(agenda.getUniversity()))
            throw new AgendaException(FORBIDDEN_UNIVERSITY_ACCESS);
    }

    /**
     * ✅ 새로운 "답해요" 채팅방을 생성합니다.
     *
     * @param adminId 관리자 ID
     * @param request "답해요" 생성 요청 DTO
     * @return 생성된 "답해요" 응답 DTO
     * @throws AdminException 관리자를 찾을 수 없는 경우
     */
    @Transactional
    public AgendaCreationResponse createAgenda(final Long adminId, final AgendaCreationRequest request) {
        badWordService.validate(request.title(), request.content());
        final Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));

        final Agenda save = agendaRepository.save(Agenda.builder()
                .admin(admin)
                .university(admin.getUniversity())
                .categoryType(request.categoryType())
                .title(request.title())
                .content(request.content())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .isEnd(false)
                .build());

        final List<AgendaImage> images = makeImages(request.images(), save);
        agendaImageRepository.saveAll(images);

        // 첫번째 채팅을 저장한다.
        final AgendaChat firstChat = agendaChatRepository.save(AgendaChat.builder()
                .images(request.images())
                .isAdmin(true)
                .agendaId(save.getId())
                .chat(save.getContent())
                .createdAt(save.getCreatedAt())
                .build());

        save.setFirstChatId(firstChat.getId().toString());
        // 생성한 학생회의 마지막 읽은 채팅을 업데이트한다.
        adminAgendaChatRepository.upsertAdminLastReadChat(save.getId(), adminId, firstChat.getId());

        return AgendaCreationResponse.from(save);
    }

    @Transactional(readOnly = true)
    public AgendaDetailResponse getAgendaDetail(Long adminId, Long agendaId) {
        final Admin admin = getAdmin(adminId);
        final Agenda agenda = getAgenda(agendaId);

        validAdminWithAgenda(admin, agenda);

        return AgendaDetailResponse.from(agenda);
    }

    /**
     * ✅ 특정 "답해요" 채팅방을 종료합니다.
     *
     * @param adminId  관리자
     * @param agendaId 종료할 "답해요" ID
     * @throws AgendaException 게시글을 찾을 수 없는 경우
     * @throws AgendaException 대학이 일치하지 않는 경우
     */
    @Transactional
    public void endAgenda(Long adminId, final Long agendaId) {
        final Admin admin = getAdmin(adminId);
        final Agenda agenda = getAgenda(agendaId);

        validAdminWithAgenda(admin, agenda);

        agenda.end();
    }

    /**
     * ✅ 특정 "답해요" 채팅방을 삭제합니다.
     * <p>
     * - 해당 게시글과 관련된 모든 데이터를 삭제합니다.
     * - 향후 "답해요" 관련 채팅 내역 삭제 기능 추가 예정.
     *
     * @param adminId  관리자 ID
     * @param agendaId 삭제할 "답해요" ID
     * @throws AgendaException 대학이 일치하지 않는 경우
     *                         </p>
     */
    @Transactional
    public void deleteAgenda(Long adminId, final Long agendaId) {
        final Admin admin = getAdmin(adminId);
        final Agenda agenda = getAgenda(agendaId);

        validAdminWithAgenda(admin, agenda);

        agendaRepository.deleteById(agendaId);

        // TODO: Async로 "답해요" 관련 채팅 내역 삭제 로직 추가 필요
    }

    /**
     * ✅ 기존 "답해요" 채팅방을 수정합니다.
     *
     * @param adminId  관리자 ID
     * @param agendaId 수정할 "답해요" ID
     * @param request  수정 요청 DTO
     * @throws AgendaException 게시글을 찾을 수 없는 경우
     */
    @Transactional
    public void editAgenda(Long adminId, final Long agendaId, final AgendaEditRequest request) {
        badWordService.validate(request.title(), request.content());
        Admin admin = getAdmin(adminId);
        Agenda agenda = getAgenda(agendaId);

        validAdminWithAgenda(admin, agenda);

        final Agenda updateAgenda = Agenda.builder()
                .id(agendaId)
                .categoryType(request.categoryType())
                .university(agenda.getUniversity())
                .admin(agenda.getAdmin())
                .title(request.title())
                .startDate(agenda.getStartDate())
                .endDate(agenda.getEndDate())
                .content(request.content())
                .isEnd(agenda.isEnd())
                .count(agenda.getCount())
                .firstChatId(agenda.getFirstChatId())
                .images(updateImages(agenda.getImages(), request.images(), agenda))
                .build();

        agendaRepository.save(updateAgenda);

        // 첫번째 채팅을 수정한다.
        agendaChatRepository.findById(agenda.getFirstChatId()).ifPresentOrElse(chat -> {
            chat.update(request.content(), request.images());
            agendaChatRepository.save(chat);
        }, () -> {
            throw new AgendaException(INVALID_AGENDA);
        });

    }

    private Admin getAdmin(Long adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(INVALID_ADMIN));
    }

    private Agenda getAgenda(Long agendaId) {
        return agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));
    }

    /**
     * ✅ 기존 이미지 리스트를 업데이트합니다.
     *
     * @param oldImages     기존 이미지 리스트
     * @param newImageNames 새로운 이미지 파일명 리스트
     * @param agenda        수정할 "답해요" 채팅방
     * @return 업데이트된 이미지 리스트
     */
    private List<AgendaImage> updateImages(final List<AgendaImage> oldImages, final List<String> newImageNames, Agenda agenda) {
        List<AgendaImage> newImages = newImageNames.stream()
                .map(imageName -> makeUpdatedImages(oldImages, imageName, agenda))
                .toList();

        deleteNotUsedImages(oldImages, newImages);
        saveNewlyImages(oldImages, newImages);
        return newImages;
    }

    /**
     * ✅ 기존 이미지 리스트에서 새로운 이미지가 포함되어 있는지 확인 후 추가합니다.
     *
     * @param oldImages 기존 이미지 리스트
     * @param imageName 새로운 이미지 파일명
     * @param agenda    수정할 "답해요" 게시글
     * @return 업데이트된 AgendaImage 객체
     */
    private AgendaImage makeUpdatedImages(final List<AgendaImage> oldImages, final String imageName, final Agenda agenda) {
        return oldImages.stream()
                .filter(oldImage -> oldImage.getName().equals(imageName))
                .findAny()
                .orElseGet(() -> AgendaImage.builder()
                        .agenda(agenda)
                        .name(imageName)
                        .build());
    }

    /**
     * ✅ 새로운 이미지가 추가된 경우 저장합니다.
     *
     * @param oldImages 기존 이미지 리스트
     * @param newImages 새롭게 추가된 이미지 리스트
     */
    private void saveNewlyImages(final List<AgendaImage> oldImages, final List<AgendaImage> newImages) {
        final List<AgendaImage> newlyImages = newImages.stream()
                .filter(image -> !oldImages.contains(image))
                .toList();

        agendaImageRepository.saveAll(newlyImages);
    }

    /**
     * ✅ 사용되지 않는 이미지를 삭제합니다.
     *
     * @param oldImages 기존 이미지 리스트
     * @param newImages 새롭게 추가된 이미지 리스트
     */
    private void deleteNotUsedImages(final List<AgendaImage> oldImages, final List<AgendaImage> newImages) {
        final List<AgendaImage> deletedImages = oldImages.stream()
                .filter(image -> !newImages.contains(image))
                .toList();
        if (deletedImages.isEmpty())
            return;

        agendaImageRepository.deleteAll(deletedImages);
    }

    /**
     * ✅ 새로운 "답해요" 게시글에 포함된 이미지를 생성합니다.
     *
     * @param images 이미지 파일명 리스트
     * @param agenda "답해요" 게시글 객체
     * @return 생성된 이미지 리스트
     */
    private List<AgendaImage> makeImages(final List<String> images, final Agenda agenda) {
        return images.stream()
                .map(image ->
                        AgendaImage.builder()
                                .agenda(agenda)
                                .name(image)
                                .build())
                .toList();
    }
}