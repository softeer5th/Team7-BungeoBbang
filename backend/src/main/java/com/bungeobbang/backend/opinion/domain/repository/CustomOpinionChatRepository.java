package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomOpinionChatRepository {

    private final MongoTemplate mongoTemplate;

    public List<OpinionChat> findOpinionChats(Long opinionId, ObjectId lastChatId, ScrollType scroll) {
        List<AggregationOperation> operations = new ArrayList<>();

        // 기본 match 조건 (opinionId 일치)
        Criteria criteria = Criteria.where("opinionId").is(opinionId);
        if (scroll == null) {
            // lastChatId를 기준으로 위쪽 10개 가져오기 (ID < lastChatId)
            Aggregation aggregation = Aggregation.newAggregation(
                    Aggregation.match(Criteria.where("opinionId").is(opinionId)), // opinionId 필터
                    Aggregation.facet(
                                    // 위쪽 데이터 (ID < lastChatId, 내림차순 후 10개)
                                    Aggregation.match(Criteria.where("_id").lt(lastChatId)),
                                    Aggregation.sort(org.springframework.data.domain.Sort.Direction.DESC, "_id"),
                                    Aggregation.limit(10)
                            ).as("upChats")

                            .and(
                                    // 현재 lastChatId에 해당하는 데이터 (중앙)
                                    Aggregation.match(Criteria.where("_id").is(lastChatId))
                            ).as("lastReadChat")

                            .and(
                                    // 아래쪽 데이터 (ID > lastChatId, 오름차순 후 10개)
                                    Aggregation.match(Criteria.where("_id").gt(lastChatId)),
                                    Aggregation.sort(org.springframework.data.domain.Sort.Direction.ASC, "_id"),
                                    Aggregation.limit(10)
                            ).as("downChats")
            );

            // Aggregation 실행
            AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "opinion_chat", Document.class);

            if (results.getMappedResults().isEmpty()) {
                return new ArrayList<>();
            }

            Document resultDoc = results.getMappedResults().get(0);
            List<OpinionChat> upChats = extractChats(resultDoc, "upChats");
            List<OpinionChat> lastReadChat = extractChats(resultDoc, "lastReadChat");
            List<OpinionChat> downChats = extractChats(resultDoc, "downChats");

            // upChats는 다시 정렬 (내림차순 → 오름차순)
            Collections.reverse(upChats);

            // 최종 결과 조합: (UP 10개) + (lastReadChat) + (DOWN 10개)
            List<OpinionChat> result = new ArrayList<>();
            result.addAll(upChats);
            result.addAll(lastReadChat);
            result.addAll(downChats);

            return result;
        }


        // scroll 값에 따라 조건 추가
        if (scroll.equals(ScrollType.UP)) {
            // 위로 스크롤 (lastChatId보다 작은 데이터)
            criteria.and("_id").lt(lastChatId);
        } else if (scroll.equals(ScrollType.DOWN)) {
            // 아래로 스크롤 (lastChatId보다 큰 데이터)
            criteria.and("_id").gt(lastChatId);
        }

        // Match 적용
        operations.add(Aggregation.match(criteria));

        // 정렬 (오름차순 또는 내림차순)
        SortOperation sortOperation = scroll.equals(ScrollType.UP) ?
                Aggregation.sort(org.springframework.data.domain.Sort.Direction.DESC, "_id") :
                Aggregation.sort(org.springframework.data.domain.Sort.Direction.ASC, "_id");

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

    /**
     * Document에서 OpinionChat 리스트 추출
     */
    private List<OpinionChat> extractChats(Document resultDoc, String field) {
        List<Document> chatDocs = (List<Document>) resultDoc.get(field);
        return chatDocs.stream()
                .map(doc -> mongoTemplate.getConverter().read(OpinionChat.class, doc))
                .collect(Collectors.toList());
    }
}
