package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionChatRepository extends MongoRepository<OpinionChat, String> {

    @Query("SELECT DISTINCT oc FROM opinion_chat oc " +
            "WHERE oc.isAdmin = true AND oc.opinionId IN :opinionIds")
    List<OpinionChat> findDistinctOpinionIdByIsAdminTrue(@Param("opinionIds") List<Long> opinionIds);

    Optional<OpinionChat> findTopByOpinionIdOrderByCreatedAtDesc(Long opinionId);

}
