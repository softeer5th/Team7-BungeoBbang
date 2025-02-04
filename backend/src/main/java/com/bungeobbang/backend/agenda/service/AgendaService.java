package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.LastChat;
import com.bungeobbang.backend.agenda.dto.response.MyAgendaResponse;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    private final AgendaMemberRepository agendaMemberRepository;
    private final CustomAgendaChatRepository customAgendaChatRepository;
    private final AgendaRepository agendaRepository;
    private final MemberRepository memberRepository;
    private final AgendaFinders agendaFinders;

    /**
     * <h3>답해요에 사용자 참여</h3>
     * <p>사용자가 특정 답해요에 참여하며, 현재 시점에서의 마지막 채팅을 마지막 읽은 채팅으로 저장합니다.</p>
     *
     * @param memberId 참여할 사용자 ID
     * @param agendaId 참여할 답해요 ID
     * @throws AgendaException 사용자가 해당 대학교 소속이 아닐 경우 예외 발생
     */
    public void participateAgenda(final Long memberId, final Long agendaId) {
        final Member member = getMember(memberId);

        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));

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

        // 현재 시점에서의 마지막 채팅을 마지막 읽은 채팅으로 저장
        // todo 비동기 고려
        final LastChat lastChat = customAgendaChatRepository.findLastChat(agendaId, memberId);
        customAgendaChatRepository.saveLastReadChat(agendaId, memberId, lastChat.chatId());
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
    public List<AgendaResponse> getAgendasByStatus(final Long memberId, final AgendaStatusType status, final LocalDate endDate, final Long agendaId) {
        final Member member = getMember(memberId);
        final AgendaFinder finder = agendaFinders.mapping(status);
        return finder.findAllByStatus(member.getUniversity().getId(), endDate, agendaId);
    }

    /**
     * <h3>내가 참여한 답해요 조회</h3>
     * <p>사용자가 참여한 모든 답해요을 조회하며, 각 답해요의 최신 채팅 및 읽음 여부를 포함합니다.</p>
     *
     * @param memberId 조회할 사용자 ID
     * @return 내가 참여한 답해요 목록
     */
    public List<MyAgendaResponse> getMyAgenda(final Long memberId) {
        final Member member = getMember(memberId);

        // 사용자가 참여한 Agenda 목록 조회
        final List<Agenda> agendaList = agendaMemberRepository.findAllByMember(member)
                .stream()
                .map(AgendaMember::getAgenda)
                .toList();

        Map<Long, Agenda> agendaMap = agendaList.stream()
                .collect(Collectors.toMap(Agenda::getId, agenda -> agenda));

        // 각 Agenda의 최신 채팅 조회
        final List<LastChat> lastChats = customAgendaChatRepository.findLastChats(
                new ArrayList<>(agendaMap.keySet()), memberId);
        // 최신 채팅과 마지막 읽은 채팅 비교 후 hasNew 여부 계산
        return lastChats.stream()
                .map(lastChat -> {
                    final ObjectId lastReadChat = getLastReadChat(lastChat.agendaId(), memberId);
                    final boolean hasNew = hasNewMessage(lastChat.chatId(), lastReadChat);
                    final Agenda agenda = agendaMap.get(lastChat.agendaId());

                    return MyAgendaResponse.builder()
                            .title(agenda.getTitle())
                            .count(agenda.getCount())
                            .agendaId(agenda.getId())
                            .isEnd(agenda.getEndDate().isBefore(LocalDate.now()))
                            .categoryType(agenda.getCategoryType())
                            .lastChat(lastChat.content())
                            .createdAt(lastChat.createdAt())
                            .hasNew(hasNew)
                            .build();
                })
                .toList();
    }

    /**
     * <h3>답해요 탈퇴</h3>
     * <p>사용자가 특정 답해요에서 탈퇴합니다.</p>
     *
     * @param memberId 탈퇴할 사용자 ID
     * @param agendaId 탈퇴할 답해요 ID
     */
    public void exitAgenda(final Long memberId, final Long agendaId) {
        agendaMemberRepository.deleteByMemberIdAndAgendaId(memberId, agendaId);
    }

    /**
     * <h3>마지막 읽은 채팅 ID 조회</h3>
     * <p>MongoDB에서 특정 사용자의 마지막 읽은 채팅 ID를 가져옵니다.</p>
     *
     * @param agendaId 조회할 답해요 ID
     * @param memberId 조회할 사용자 ID
     * @return 마지막으로 읽은 채팅의 ObjectId (없으면 null)
     */
    private ObjectId getLastReadChat(final Long agendaId, final Long memberId) {
        return customAgendaChatRepository.findLastReadChat(agendaId, memberId);
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

    /**
     * <h3>새로운 메시지 여부 확인</h3>
     * <p>마지막 읽은 채팅과 최신 채팅 ID를 비교하여 새로운 메시지가 있는지 확인합니다.</p>
     *
     * @param lastChat     최신 채팅 ID
     * @param lastReadChat 마지막으로 읽은 채팅 ID
     * @return 새로운 메시지가 있으면 true, 없으면 false
     */
    private boolean hasNewMessage(final ObjectId lastChat, final ObjectId lastReadChat) {
        if (lastReadChat == null) {
            return false;
        }
        return lastChat.compareTo(lastReadChat) > 0;
    }
}
