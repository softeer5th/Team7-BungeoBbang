package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionChatRepository extends MongoRepository<OpinionChat, String> {

    @Aggregation(pipeline = {
            "{ $match: { isAdmin: true, opinionId: { $in: ?0 } } }",
            "{ $group: { _id: '$opinionId' } }"
    })
    List<Long> findDistinctOpinionIdByIsAdminTrue(List<Long> opinionIds);

    Optional<OpinionChat> findTopByOpinionIdOrderByCreatedAtDesc(Long opinionId);

}
