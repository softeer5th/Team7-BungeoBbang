package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OpinionChatRepository extends MongoRepository<OpinionChat, String> {

    // memberId와 opinionId로 조회
    List<OpinionChat> findByMemberIdAndOpinionId(Long memberId, Long opinionId);

    // 특정 기간 동안의 OpinionChat 조회
    List<OpinionChat> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // 특정 memberId로 조회
    List<OpinionChat> findByMemberId(Long memberId);

    // id를 기준으로 조회 (Document ID가 String 타입인 경우)
    Optional<OpinionChat> findById(String id);

    @Aggregation(pipeline = {
            "{ $match: { isAdmin: true, opinionId: { $in: ?0 } } }",
            "{ $group: { _id: '$opinionId' } }"
    })
    List<Long> findDistinctOpinionIdByIsAdminTrue(List<Long> opinionIds);

    Optional<OpinionChat> findTopByOpinionIdOrderByCreatedAtDesc(Long opinionId);

}
