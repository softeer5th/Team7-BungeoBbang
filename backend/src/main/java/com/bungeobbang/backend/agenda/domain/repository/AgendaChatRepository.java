package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaChatRepository extends MongoRepository<AgendaChat, String> {
    @Query(value = "{ 'agendaId' : ?0, _id : { $lt :  ?1 }}"
            , sort = "{ _id : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndIdLessThan(Long agendaId, ObjectId id, Pageable pageable);

    @Query(value = "{ 'agendaId' : ?0, '_id' : { $gte: ?1 } }",
            sort = "{ '_id' : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndIdGreaterThan(Long agendaId, ObjectId id);

    @Query(value = "{ 'agendaId' : ?0, $or: [ { 'memberId': ?1 }, { 'isAdmin': true } ], '_id' : { $lt: ?2 } }",
            sort = "{ '_id' : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndMemberIdAndIdLessThan(Long agendaId, Long memberId, ObjectId id, Pageable pageable);

    @Query(value = "{ 'agendaId' : ?0, $or: [ { 'memberId': ?1 }, { 'isAdmin': true } ], '_id' : { $gte: ?2 } }",
            sort = "{ '_id' : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndMemberIdAndIdGreaterThan(Long agendaId, Long memberId, ObjectId id);
}
