package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionChatRepository extends MongoRepository<OpinionChat, String> {
    List<OpinionChat> findDistinctOpinionIdByIsAdminTrue();

    Optional<OpinionChat> findTopByOpinionIdOrderByCreatedAtDesc(Long opinionId);

}
