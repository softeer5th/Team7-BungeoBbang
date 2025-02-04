package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionChatRepository extends MongoRepository<OpinionChat, String> {

    @Aggregation(pipeline = {
            "{ $match: { opinionId: ?0, _id: { $lt: ?1 } } }",
            "{ $sort: { _id: -1 } }",
            "{ $limit: 10 }"
    })
    List<OpinionChat> findByOpinionIdAndLastChatId(Long opinionId, ObjectId lastChatId);

    @Aggregation(pipeline = {
            "{ $match: { isAdmin: true, opinionId: { $in: ?0 } } }",
            "{ $group: { _id: '$opinionId' } }"
    })
    List<Long> findDistinctOpinionIdByIsAdminTrue(List<Long> opinionIds);


    Optional<OpinionChat> findTopByOpinionIdOrderByIdDesc(Long opinionId);


}
