package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.dto.AgendaLatestChat;
import com.bungeobbang.backend.common.type.ScrollType;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Map;

public interface MemberAgendaChatRepository {

    /*
     * 주어진 답해요 채팅방들의 마지막 채팅을 조회한다.
     */
    List<AgendaLatestChat> findLastChats(List<Long> agendaIdList, Long memberId);

    /*
     * member의 마지막 읽은 채팅을 upsert한다.
     */
    void upsertLastReadChat(Long agendaId, Long memberId, ObjectId lastChatId);

    /*
     * 특접 답해요 채팅방의 마지막 채팅을 조회한다.
     */
    AgendaChat findLastChat(Long agendaId, Long memberId);

    /*
     * 스크롤에 따라 채팅 내역 무한 스크롤 조회한다.
     */
    List<AgendaChat> findChatsByScroll(Long agendaId, Long memberId, ObjectId chatId, ScrollType scrollType);

    Map<Long, ObjectId> findAllByAgendaId(List<Long> agendaList, Long memberId);
}
