package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaLastReadChat;
import com.bungeobbang.backend.agenda.domain.repository.AgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaLastReadChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ✅ 학생용 답해요 채팅 서비스 (무한 스크롤 지원)
 */
@Service
@RequiredArgsConstructor
public class AgendaChatService {
    private final AgendaChatRepository agendaChatRepository;
    private final AgendaMemberRepository agendaMemberRepository;
    private final CustomAgendaChatRepository customAgendaChatRepository;
    private static final int CHAT_SIZE = 10;
    private static final ObjectId MIN_OBJECT_ID = new ObjectId(0, 0);
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private final AgendaLastReadChatRepository agendaLastReadChatRepository;

    /**
     * ✅ 답해요 채팅 내역 조회 (무한 스크롤 방식)
     *
     * @param agendaId 조회할 답해요(안건)의 ID
     * @param chatId   기준이 되는 `chatId` (무한 스크롤)
     *                 - `null`이면 최신 데이터 10개 조회
     *                 - `chatId`가 존재하면 해당 ID 이전의 데이터 10개 조회
     * @return `AgendaChatResponse` 리스트 (최대 10개)
     */
    public List<AgendaChatResponse> getChats(Long memberId, Long agendaId, ObjectId chatId) {
        Pageable pageable = PageRequest.of(0, CHAT_SIZE);
        if (!agendaMemberRepository.existsByMemberIdAndAgendaId(memberId, agendaId)) {
            throw new AgendaException(ErrorCode.NOT_PARTICIPATED);
        }

        if (chatId == null) {
            // 사용자의 마지막 읽은 채팅 가져오기
            AgendaLastReadChat lastReadChat = agendaLastReadChatRepository.findByMemberIdAndAgendaId(memberId, agendaId)
                    .orElse(new AgendaLastReadChat(null, null, null, MIN_OBJECT_ID));
            ObjectId lastReadChatId = lastReadChat.getLastReadChatId();

            // lastReadChatId보다 작은 채팅 가져오기
            List<AgendaChatResponse> chats = agendaChatRepository
                    .findChatsByAgendaIdAndMemberIdAndIdLessThan(agendaId, memberId, lastReadChatId, pageable)
                    .stream()
                    .map(AgendaChatResponse::from)
                    .collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
                        Collections.reverse(list); // 🔹 리스트 역순 정렬
                        return list;
                    }));

            // lastReadChatId보다 큰 채팅 가져오기
            List<AgendaChatResponse> afterChats = agendaChatRepository
                    .findChatsByAgendaIdAndMemberIdAndIdGreaterThan(agendaId, memberId, lastReadChatId)
                    .stream()
                    .map(AgendaChatResponse::from)
                    .collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
                        Collections.reverse(list); // 🔹 리스트 역순 정렬
                        return list;
                    }));

            chats.addAll(afterChats); // 최종 리스트 합치기

            return chats;
        }


        return agendaChatRepository.findChatsByAgendaIdAndMemberIdAndIdLessThan(agendaId, memberId, chatId, pageable)
                .stream()
                .map(AgendaChatResponse::from)
                .collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
                    Collections.reverse(list); // 🔹 리스트 역순 정렬
                    return list;
                }));
    }

    public void saveChat(AgendaChatRequest request) {
        agendaChatRepository.save(AgendaChat.builder()
                .memberId(request.memberId())
                .images(request.images())
                .isAdmin(false)
                .agendaId(request.agendaId())
                .chat(request.chat())
                .build());
    }

    public void updateLastReadToMax(Long agendaId, Long memberId) {
        customAgendaChatRepository.upsertLastReadChat(agendaId, memberId, MAX_OBJECT_ID);
    }
}
