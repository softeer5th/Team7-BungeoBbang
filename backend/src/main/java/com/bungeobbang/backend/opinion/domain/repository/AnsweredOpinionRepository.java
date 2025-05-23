package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.AnsweredOpinion;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredOpinionRepository extends MongoRepository<AnsweredOpinion, ObjectId> {
    Long countByIdBetweenAndUniversityId(ObjectId start, ObjectId end, Long universityId);
}
