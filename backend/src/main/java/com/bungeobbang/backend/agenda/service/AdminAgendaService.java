package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.repository.AgendaImageRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_AGENDA;

/**
 * 🔹 관리자 "답해요" 서비스
 * <p>
 * - "답해요" 채팅방 관리 서비스.
 * - 답해요 생성, 수정, 종료, 삭제 기능 제공.
 * - 관리자(Admin) 권한으로 관리.
 * </p>
 */
@Service
@RequiredArgsConstructor
public class AdminAgendaService {
    private final AgendaRepository agendaRepository;
    private final AgendaImageRepository agendaImageRepository;
    private final AdminRepository adminRepository;

    /**
     * ✅ 새로운 "답해요" 채팅방을 생성합니다.
     *
     * @param adminId 관리자 ID
     * @param request "답해요" 생성 요청 DTO
     * @return 생성된 "답해요" 응답 DTO
     * @throws AdminException 관리자를 찾을 수 없는 경우
     */
    public AgendaCreationResponse createAgenda(final Long adminId, final AgendaCreationRequest request) {
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

        return AgendaCreationResponse.from(save);
    }

    /**
     * ✅ 특정 "답해요" 채팅방을 종료합니다.
     *
     * @param agendaId 종료할 "답해요" ID
     * @throws AgendaException 게시글을 찾을 수 없는 경우
     */
    @Transactional
    public void endAgenda(final Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        agenda.end();
    }

    /**
     * ✅ 특정 "답해요" 채팅방을 삭제합니다.
     * <p>
     * - 해당 게시글과 관련된 모든 데이터를 삭제합니다.
     * - 향후 "답해요" 관련 채팅 내역 삭제 기능 추가 예정.
     * </p>
     *
     * @param agendaId 삭제할 "답해요" ID
     */
    @Transactional
    public void deleteAgenda(final Long agendaId) {
        agendaRepository.deleteById(agendaId);

        // TODO: Async로 "답해요" 관련 채팅 내역 삭제 로직 추가 필요
    }

    /**
     * ✅ 기존 "답해요" 채팅방을 수정합니다.
     *
     * @param agendaId 수정할 "답해요" ID
     * @param request  수정 요청 DTO
     * @throws AgendaException 게시글을 찾을 수 없는 경우
     */
    @Transactional
    public void editAgenda(final Long agendaId, final AgendaEditRequest request) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        final Agenda updateAgenda = Agenda.builder()
                .categoryType(request.categoryType())
                .university(agenda.getUniversity())
                .admin(agenda.getAdmin())
                .title(request.title())
                .startDate(agenda.getStartDate())
                .endDate(agenda.getEndDate())
                .content(request.content())
                .isEnd(agenda.isEnd())
                .count(agenda.getCount())
                .images(updateImages(agenda.getImages(), request.images(), agenda))
                .build();
        // todo 반환값 추가 필요
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
     * @param agenda 수정할 "답해요" 게시글
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