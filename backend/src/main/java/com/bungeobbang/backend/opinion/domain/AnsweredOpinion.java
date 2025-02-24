package com.bungeobbang.backend.opinion.domain;

import jakarta.persistence.Id;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document("answered_opinion")
public class AnsweredOpinion {

    @Id
    private ObjectId id;

    private Long opinionId;

    private Long universityId;

    public AnsweredOpinion(Long opinionId, Long universityId) {
        this.opinionId = opinionId;
        this.universityId = universityId;
    }
}
