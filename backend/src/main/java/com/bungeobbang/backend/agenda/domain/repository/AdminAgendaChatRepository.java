package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.common.type.ScrollType;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;

public interface AdminAgendaChatRepository {
    Map<Long, Boolean> findUnreadStatus(List<Long> agendaIdList, Long adminId);
    AgendaChat findLastChat(Long agendaId);
    void upsertAdminLastReadChat(Long agendaId, Long adminId, ObjectId lastChatId);

    List<AgendaChat> findChatsByScroll(Long agendaId, ObjectId chatId, ScrollType scrollType);
}
