package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.AnsweredOpinion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomAnsweredOpinionRepository {

    public static final String OPINION_ID = "opinionId";
    public static final String UNIVERSITY_ID = "universityId";
    private final MongoTemplate mongoTemplate;

    /**
     * 중복된 (opinionId, universityId) 데이터가 없을 경우만 저장
     */
    public void saveIfNotExists(Long opinionId, Long universityId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(OPINION_ID).is(opinionId)
                .and(UNIVERSITY_ID).is(universityId));

        Update update = new Update()
                .setOnInsert(OPINION_ID, opinionId)
                .setOnInsert(UNIVERSITY_ID, universityId);

        mongoTemplate.upsert(query, update, AnsweredOpinion.class);
    }

}
