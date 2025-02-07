package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.repository.AgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ✅ 관리자용 답해요 채팅 서비스 (무한 스크롤 지원)
 * <p>
 * - 특정 `agendaId`의 채팅 내역을 불러오는 서비스
 * - 무한 스크롤 방식으로 추가적인 데이터를 요청할 수 있음
 * - `chatId == null`이면 최신 데이터 10개 조회
 * - `chatId != null`이면 해당 `chatId` 이전의 데이터 10개 조회 (더보기 기능)
 * </p>
 */
@Service
@RequiredArgsConstructor
public class AdminAgendaChatService {
    private static final int CHAT_SIZE = 10;
    private final AgendaChatRepository agendaChatRepository;
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private final CustomAgendaChatRepository customAgendaChatRepository;

    /**
     * ✅ 답해요 채팅 내역 조회 (무한 스크롤 방식)
     *
     * @param agendaId 조회할 답해요(안건)의 ID
     * @param chatId   기준이 되는 `chatId` (무한 스크롤)
     *                 - `null`이면 최신 데이터 10개 조회
     *                 - `chatId`가 존재하면 해당 ID 이전의 데이터 10개 조회
     * @return `AgendaChatResponse` 리스트 (최대 10개)
     */
    public List<AgendaChatResponse> getChats(Long adminId, Long agendaId, ObjectId chatId) {

        Pageable pageable = PageRequest.of(0, CHAT_SIZE);

        // ✅ 최신 채팅 10개 조회 (첫 페이지)
        if (chatId == null) {
            return agendaChatRepository.findAllByAgendaId(agendaId, true, pageable)
                    .stream()
                    .map(AgendaChatResponse::from)
                    .toList();
        }

        // ✅ 특정 `chatId` 이전의 채팅 10개 조회 (무한 스크롤)
        return agendaChatRepository.findAllByAgendaIdAndIdLessThan(agendaId, true, chatId, pageable)
                .stream()
                .map(AgendaChatResponse::from)
                .toList();
    }

    public void saveChat(AgendaChatRequest request) {
        agendaChatRepository.save(AgendaChat.builder()
                .images(request.images())
                .isAdmin(true)
                .agendaId(request.agendaId())
                .chat(request.chat())
                .build());
    }

    public void updateLastReadToMax(Long agendaId, Long adminId) {
        customAgendaChatRepository.upsertAdminLastReadChat(agendaId, adminId, MAX_OBJECT_ID);
    }
}
