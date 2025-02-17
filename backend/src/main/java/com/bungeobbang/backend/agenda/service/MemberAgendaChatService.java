package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.repository.AgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.MemberAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.type.ScrollType;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * ✅ 학생용 답해요 채팅 서비스 (무한 스크롤 지원)
 */
@Service
@RequiredArgsConstructor
public class MemberAgendaChatService {
    private final AgendaRepository agendaRepository;
    private final AgendaChatRepository agendaChatRepository;
    private final AgendaMemberRepository agendaMemberRepository;
    private final MemberAgendaChatRepository memberAgendaChatRepository;

    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");


    /**
     * ✅ 답해요 채팅 내역 조회 (무한 스크롤 방식)
     *
     * @param agendaId 조회할 답해요(안건)의 ID
     * @param chatId   기준이 되는 `chatId` (무한 스크롤)
     *                 - `null`이면 최신 데이터 10개 조회
     *                 - `chatId`가 존재하면 해당 ID 이전의 데이터 10개 조회
     * @return `AgendaChatResponse` 리스트 (최대 10개)
     */
    public List<AgendaChatResponse> getChats(Long memberId, Long agendaId, ObjectId chatId, ScrollType scrollType) {
        final boolean isEnd = agendaRepository.existsByIdAndEndDateBefore(agendaId, LocalDate.now());
        // 종료된 답해요는 누구나 조회 가능
        if (!isEnd && !agendaMemberRepository.existsByMemberIdAndAgendaIdAndIsDeletedFalse(memberId, agendaId)) {
            throw new AgendaException(ErrorCode.NOT_PARTICIPATED);
        }

        return memberAgendaChatRepository.findChatsByScroll(agendaId, memberId, chatId, scrollType)
                .stream()
                .map(AgendaChatResponse::from)
                .toList();
    }

    public void saveChat(AgendaChatRequest request) {
        agendaChatRepository.save(AgendaChat.builder()
                .memberId(request.memberId())
                .images(request.images())
                .isAdmin(false)
                .agendaId(request.agendaId())
                .chat(request.chat())
                .createdAt(request.createdAt())
                .build());
    }

    public void updateLastReadToMax(Long agendaId, Long memberId) {
        memberAgendaChatRepository.upsertLastReadChat(agendaId, memberId, MAX_OBJECT_ID);
    }

    public void updateLastRead(Long agendaId, Long memberId) {
        final AgendaChat lastChat = memberAgendaChatRepository.findLastChat(agendaId, memberId);
        memberAgendaChatRepository.upsertLastReadChat(agendaId, memberId, lastChat.getId());
    }

    public void validAgenda(Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));

        if (agenda.getStartDate().isAfter(LocalDate.now()))
            throw new AgendaException(ErrorCode.AGENDA_NOT_STARTED);

        if (agenda.getEndDate().isBefore(LocalDate.now()))
            throw new AgendaException(ErrorCode.AGENDA_CLOSED);
    }
}
