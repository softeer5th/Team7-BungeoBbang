package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.MemberAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.AgendaLatestChat;
import com.bungeobbang.backend.agenda.dto.MemberAgendaSubResult;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MyAgendaResponse;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinder;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinders;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.bungeobbang.backend.common.exception.ErrorCode.AGENDA_PARTICIPATION_NOT_FOUND;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_AGENDA;

/**
 * <h2>AgendaService</h2>
 * <p>사용자가 참여하는 답해요(Agenda) 관련 비즈니스 로직을 처리하는 서비스 클래스</p>
 * <ul>
 *     <li>답해요 참여 및 탈퇴</li>
 *     <li>답해요 상태별 조회</li>
 *     <li>내가 참여한 답해요 조회</li>
 *     <li>MongoDB를 활용한 마지막 읽은 채팅 처리</li>
 * </ul>
 *
 * @author [zoouniak]
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
public class AgendaService {
    private final AgendaFinders agendaFinders;
    private final AgendaRepository agendaRepository;
    private final MemberRepository memberRepository;
    private final AgendaMemberRepository agendaMemberRepository;
    private final MemberAgendaChatRepository memberAgendaChatRepository;

    private final static ObjectId MIN_OBJECT_ID = new ObjectId("000000000000000000000000");

    /**
     * <h3>답해요에 사용자 참여</h3>
     * <p>사용자가 특정 답해요에 참여하며, 현재 시점에서의 마지막 채팅을 마지막 읽은 채팅으로 저장합니다.</p>
     * <p>채팅이 없을 경우 가장 작은 objectId가 저장합니다.</p>
     *
     * @param memberId 참여할 사용자 ID
     * @param agendaId 참여할 답해요 ID
     * @throws AgendaException 사용자가 해당 대학교 소속이 아닐 경우 예외 발생
     */
    @Transactional
    public void participateAgenda(final Long memberId, final Long agendaId) {
        final Member member = getMember(memberId);
        final Agenda agenda = agendaRepository.findByIdWithLock(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        if (!agenda.getUniversity().equals(member.getUniversity())) {
            throw new AgendaException(ErrorCode.FORBIDDEN_UNIVERSITY_ACCESS);
        }
        if (agendaMemberRepository.existsByMemberIdAndAgendaId(memberId, agendaId)) {
            throw new AgendaException(ErrorCode.ALREADY_PARTICIPATED);
        }

        agendaMemberRepository.save(AgendaMember.builder()
                .agenda(agenda)
                .member(member)
                .build()
        );
        agenda.increaseParticipantCount(1);

        // 현재 시점에서의 마지막 채팅을 마지막 읽은 채팅으로 저장
        final AgendaChat lastChat = memberAgendaChatRepository.findLastChat(agendaId, memberId);
        ObjectId lastChatId = lastChat == null ? MIN_OBJECT_ID : lastChat.getId();
        memberAgendaChatRepository.upsertLastReadChat(agendaId, memberId, lastChatId);
    }

    /**
     * <h3>답해요 상태별 조회</h3>
     * <p>진행 중, 예정됨, 종료된 답해요을 상태에 따라 조회합니다.</p>
     *
     * @param memberId 조회할 사용자 ID
     * @param status   조회할 답해요 상태 (예: 진행 중, 종료됨 등)
     * @param endDate  마지막으로 조회된 답해요의 종료 날짜 (무한 스크롤용, 선택적)
     * @param agendaId 마지막으로 조회된 답해요의 ID (중복 방지 및 페이징용, 선택적)
     * @return 상태별 답해요 목록 (최대 페이지 크기 제한 적용)
     */
    public List<MemberAgendaResponse> getAgendasByStatus(final Long memberId, final AgendaStatusType status, final LocalDate endDate, final Long agendaId) {
        final Member member = getMember(memberId);
        final AgendaFinder finder = agendaFinders.mapping(status);
        final List<MemberAgendaSubResult> allByStatus = finder.findAllByStatus(member.getUniversity().getId(), endDate, agendaId, memberId);
        final List<Long> list = allByStatus.stream().map(MemberAgendaSubResult::agendaId).toList();
        final Map<Long, ObjectId> lastReadChatMap = memberAgendaChatRepository.findAllByAgendaId(list, memberId);
        return allByStatus.stream()
                .map(agenda -> new MemberAgendaResponse(agenda, lastReadChatMap.getOrDefault(agenda.agendaId(), MIN_OBJECT_ID)))
                .toList();
        //return allByStatus;
    }

    public AgendaDetailResponse getAgendaDetail(final Long memberId, final Long agendaId) {
        final Member member = getMember(memberId);
        final Agenda agenda = getAgenda(agendaId);

        if (!agenda.getUniversity().equals(member.getUniversity())) {
            throw new AgendaException(ErrorCode.FORBIDDEN_UNIVERSITY_ACCESS);
        }

        return AgendaDetailResponse.from(agenda);
    }

    /**
     * <h3>내가 참여한 답해요 조회</h3>
     * <p>사용자가 참여한 모든 답해요를 조회하며, 각 답해요의 최신 채팅 및 읽음 여부를 포함합니다.</p>
     *
     * @param memberId 조회할 사용자 ID
     * @return 내가 참여한 답해요 목록
     */
    public List<MyAgendaResponse> getMyAgenda(final Long memberId) {
        final Member member = getMember(memberId);

        final List<Agenda> agendaList = agendaMemberRepository.findAllByMember(member)
                .stream()
                .map(AgendaMember::getAgenda)
                .toList();

        final List<Long> agendaIds = agendaList.stream()
                .map(Agenda::getId)
                .toList();

        final Map<Long, Agenda> agendaMap = agendaList.stream()
                .collect(Collectors.toMap(Agenda::getId, agenda -> agenda));

        final List<AgendaLatestChat> lastChats = memberAgendaChatRepository.findLastChats(agendaIds, memberId);

        return lastChats.stream()
                .map(lastChat ->
                        {
                            final Agenda agenda = agendaMap.get(lastChat.agendaId());
                            return MyAgendaResponse.builder()
                                    .agendaId(lastChat.agendaId())
                                    .lastChatId(lastChat.chatId())
                                    .count(agenda.getCount())
                                    .isEnd(agenda.getEndDate().isAfter(LocalDate.now()))
                                    .title(agenda.getTitle())
                                    .categoryType(agenda.getCategoryType())
                                    .createdAt(lastChat.createdAt())
                                    .hasNew(lastChat.hasNewChat())
                                    .lastChat(lastChat.content())
                                    .lastReadChatId(lastChat.lastReadChatId())
                                    .build();
                        }
                ).toList();
    }


    /**
     * <h3>답해요 탈퇴</h3>
     * <p>사용자가 특정 답해요에서 탈퇴합니다.</p>
     *
     * @param memberId 탈퇴할 사용자 ID
     * @param agendaId 탈퇴할 답해요 ID
     */
    @Transactional
    public void exitAgenda(final Long memberId, final Long agendaId) {
        if (!agendaMemberRepository.existsByMemberIdAndAgendaId(memberId, agendaId)) {
            throw new AgendaException(AGENDA_PARTICIPATION_NOT_FOUND);
        }
        agendaMemberRepository.deleteByMemberIdAndAgendaId(memberId, agendaId);
    }


    private Agenda getAgenda(Long agendaId) {
        return agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));
    }

    /**
     * <h3>사용자 정보 조회</h3>
     * <p>사용자의 ID를 기반으로 사용자 정보를 조회합니다.</p>
     *
     * @param memberId 조회할 사용자 ID
     * @return Member 객체 (없으면 예외 발생)
     * @throws MemberException 사용자가 존재하지 않을 경우 예외 발생
     */
    private Member getMember(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));
    }
}
