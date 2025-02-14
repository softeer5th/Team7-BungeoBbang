package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomOpinionChatRepository {

    public static final String OPINION_ID = "opinionId";
    public static final String ID = "_id";
    private final MongoTemplate mongoTemplate;

    public List<OpinionChat> findOpinionChats(Long opinionId, ObjectId chatId, ScrollType scroll) {
        List<AggregationOperation> operations = new ArrayList<>();

        // 기본 match 조건 (opinionId 일치)
        Criteria criteria = Criteria.where(OPINION_ID).is(opinionId);

        // scroll 값에 따라 조건 추가
        if (scroll.equals(ScrollType.UP)) {
            // 위로 스크롤 (lastChatId보다 작은 데이터)
            criteria.and(ID).lt(chatId);
        } else if (scroll.equals(ScrollType.DOWN)) {
            // 아래로 스크롤 (lastChatId보다 큰 데이터)
            criteria.and(ID).gt(chatId);
        } else if (scroll.equals(ScrollType.INITIAL)) {
            // 첫 접속 (lastChatID 포함해서 조회)
            criteria.and(ID).gte(chatId);
        }

        // Match 적용
        operations.add(Aggregation.match(criteria));

        // 정렬 (오름차순 또는 내림차순)
        SortOperation sortOperation = scroll.equals(ScrollType.UP) ?
                Aggregation.sort(Sort.Direction.DESC, ID) :
                Aggregation.sort(Sort.Direction.ASC, ID);

        operations.add(sortOperation);

        // Limit 적용
        operations.add(Aggregation.limit(10));

        // Aggregation 실행
        Aggregation aggregation = Aggregation.newAggregation(operations);
        List<OpinionChat> opinionChats = new java.util.ArrayList<>(mongoTemplate.aggregate(aggregation, "opinion_chat", OpinionChat.class).getMappedResults());
        if (scroll.equals(ScrollType.UP))
            Collections.reverse(opinionChats);
        return opinionChats;
    }
}
