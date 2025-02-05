package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaLastReadChat;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaLastReadChatRepository extends MongoRepository<AgendaLastReadChat, ObjectId> {
    AgendaLastReadChat findByMemberIdAndAgendaId(Long memberId, Long agendaId);
}
