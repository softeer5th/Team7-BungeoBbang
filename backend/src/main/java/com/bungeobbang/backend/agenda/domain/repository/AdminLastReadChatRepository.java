package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaAdminLastReadChat;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminLastReadChatRepository extends MongoRepository<AgendaAdminLastReadChat, ObjectId> {
    Optional<AgendaAdminLastReadChat> findByAdminIdAndAgendaId(Long adminId, Long agendaId);
}
