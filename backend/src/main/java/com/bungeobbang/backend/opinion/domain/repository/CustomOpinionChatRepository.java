package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
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

    public static final String OPINION_ID = "opinionId";
    public static final String ID = "_id";
    public static final String UP_CHATS = "upChats";
    public static final String DOWN_CHATS = "downChats";
    private final MongoTemplate mongoTemplate;

    public List<OpinionChat> findOpinionChats(Long opinionId, ObjectId chatId, ScrollType scroll) {
        List<AggregationOperation> operations = new ArrayList<>();

        // 기본 match 조건 (opinionId 일치)
        Criteria criteria = Criteria.where(OPINION_ID).is(opinionId);
        if (scroll == null) {
            // lastChatId를 기준으로 위쪽 10개 가져오기 (ID < chatId)
            Aggregation aggregation = Aggregation.newAggregation(
                    Aggregation.match(Criteria.where(OPINION_ID).is(opinionId)), // opinionId 필터
                    Aggregation.facet(
                                    // 위쪽 데이터 (ID < chatId, 내림차순 후 10개)
                                    Aggregation.match(Criteria.where(ID).lt(chatId)),
                                    Aggregation.sort(Sort.Direction.DESC, ID),
                                    Aggregation.limit(10),
                                    Aggregation.sort(Sort.Direction.ASC, ID)
                            ).as(UP_CHATS)

                            .and(
                                    // 아래쪽 데이터 (ID >= chatId, 오름차순 후 11개)
                                    Aggregation.match(Criteria.where(ID).gte(chatId)),
                                    Aggregation.sort(Sort.Direction.ASC, ID),
                                    Aggregation.limit(11)
                            ).as(DOWN_CHATS)
            );

            // Aggregation 실행
            AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "opinion_chat", Document.class);

            if (results.getMappedResults().isEmpty()) {
                return new ArrayList<>();
            }

            Document resultDoc = results.getMappedResults().get(0);
            List<OpinionChat> upChats = extractChats(resultDoc, UP_CHATS);
            List<OpinionChat> downChats = extractChats(resultDoc, DOWN_CHATS);

            // upChats는 다시 정렬 (내림차순 → 오름차순)
//            Collections.reverse(upChats);

            // 최종 결과 조합: (UP 10개) + (lastReadChat) + (DOWN 10개)
            List<OpinionChat> result = new ArrayList<>();
            result.addAll(upChats);
            result.addAll(downChats);

            return result;
        }


        // scroll 값에 따라 조건 추가
        if (scroll.equals(ScrollType.UP)) {
            // 위로 스크롤 (lastChatId보다 작은 데이터)
            criteria.and(ID).lt(chatId);
        } else if (scroll.equals(ScrollType.DOWN)) {
            // 아래로 스크롤 (lastChatId보다 큰 데이터)
            criteria.and(ID).gt(chatId);
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
