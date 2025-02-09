package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.dto.response.LastChat;
import org.bson.types.ObjectId;

import java.util.List;

public interface CustomAgendaChatRepository {
    // 마지막 채팅 조회
    List<LastChat> findLastChats(List<Long> agendaIdList, Long memberId);

    AgendaChat findLastChatForMember(Long agendaId, Long memberId);

    AgendaChat findLastChat(Long agendaId);

    void upsertLastReadChat(Long agendaId, Long memberId, ObjectId lastChatId);

    void upsertAdminLastReadChat(Long agendaId, Long adminId, ObjectId lastChatId);
}
