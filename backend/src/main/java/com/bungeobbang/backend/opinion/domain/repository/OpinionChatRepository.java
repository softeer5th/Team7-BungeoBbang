package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
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


    // opinionId별 최신 채팅을 가져오는 쿼리
    @Aggregation(pipeline = {
            "{ $match: { opinionId: { $in: ?0 } } }",
            "{ $sort: { _id: -1 } }",
            "{ $group: { _id: '$opinionId', chat: { $first: '$$ROOT' } } }",
            "{ $replaceRoot: { newRoot: '$chat' } }"
    })
    List<OpinionChat> findLatestChatsByOpinionIds(List<Long> opinionIds);

    @Query("{ 'opinionId': ?0, '_id': { ?1: ?2 } }")
    List<OpinionChat> findOpinionChats(Long opinionId, String comparison, ObjectId chatId, Pageable pageable);

    // opinionId에 해당하는 최신 채팅 1개를 가져오는 메서드
    Optional<OpinionChat> findTop1ByOpinionIdOrderByIdDesc(Long opinionId);

    // 최신 채팅 3개 조회
    List<OpinionChat> findTop3ByOpinionIdOrderByIdDesc(Long opinionId);
}
