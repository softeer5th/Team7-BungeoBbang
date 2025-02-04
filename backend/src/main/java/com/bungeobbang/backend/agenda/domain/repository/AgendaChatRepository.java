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
    @Query(value = "{ 'agendaId' : ?0, _id : { $lt :  ?2 }}", sort = "{ _id : -1 }")
    List<AgendaChat> findAllByAgendaIdAndIdLessThan(Long agendaId, Boolean admin, ObjectId id, Pageable pageable);

    @Query(value = "{ 'agendaId' : ?0}", sort = "{ _id : -1 }")
    List<AgendaChat> findAllByAgendaId(Long agendaId, Boolean admin, Pageable pageable);

    @Query(value = "{ 'agendaId' : ?0, $or: [ { 'memberId': ?1 }, { 'isAdmin': true } ] }", sort = "{ '_id' : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndMemberId(Long agendaId, Long memberId, Pageable pageable);

    @Query(value = "{ 'agendaId' : ?0, $or: [ { 'memberId': ?1 }, { 'isAdmin': true } ] ,_id : { $lt :  ?2 }}", sort = "{ '_id' : -1 }")
    List<AgendaChat> findChatsByAgendaIdAndMemberIdAndIdLessThan(Long agendaId, Long memberId, ObjectId id, Pageable pageable);

}
