package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaAdminLastReadChat;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.dto.AdminAgendaSubResult;
import com.bungeobbang.backend.agenda.dto.LastChat;
import com.bungeobbang.backend.common.type.ScrollType;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;

public interface AdminAgendaChatRepository {
    List<AgendaAdminLastReadChat> findLastReadChatsByAdminId(List<Long> agendaIdList, Long adminId);

    List<LastChat> findLastChats(List<Long> agendaIdList);

    Map<Long, AdminAgendaSubResult> findUnreadStatus(List<Long> agendaIdList, Long adminId);

    AgendaChat findLastChat(Long agendaId);

    void upsertLastReadChat(Long agendaId, Long adminId, ObjectId lastChatId);

    List<AgendaChat> findChatsByScroll(Long agendaId, ObjectId chatId, ScrollType scrollType);
}
