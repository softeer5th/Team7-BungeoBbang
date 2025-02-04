package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.dto.response.LastChat;
import org.bson.types.ObjectId;

import java.util.List;

public interface CustomAgendaChatRepository {
    // 마지막 채팅 조회
    List<LastChat> findLastChats(List<Long> agendaIdList, Long memberId);

    LastChat findLastChat(Long agendaId, Long memberId);

    // 마지막으로 읽은 채팅 조회
    ObjectId findLastReadChat(Long agendaId, Long memberId);

    void saveLastReadChat(Long agendaId, Long memberId, ObjectId lastChatId);
}
