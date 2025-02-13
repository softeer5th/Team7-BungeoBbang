package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomOpinionLastReadRepository {

    private final MongoTemplate mongoTemplate;

    public void updateLastRead(final Long opinionId, final boolean isAdmin, final ObjectId lastReadChatId) {
        Query query = new Query(
                Criteria.where("opinionId").is(opinionId)
                        .and("isAdmin").is(isAdmin)
        );

        Update update = new Update()
                .set("lastReadChatId", lastReadChatId) // lastReadChatId를 ObjectId로 설정
                .setOnInsert("opinionId", opinionId)    // 문서가 없으면 삽입
                .setOnInsert("isAdmin", isAdmin);       // 문서가 없으면 삽입

        mongoTemplate.upsert(query, update, OpinionLastRead.class);
    }
}
