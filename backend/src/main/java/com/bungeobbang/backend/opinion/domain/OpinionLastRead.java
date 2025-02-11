package com.bungeobbang.backend.opinion.domain;

import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document("opinion_last_read")
public class OpinionLastRead {

    private Long opinionId;

    private boolean isAdmin;

    private ObjectId lastReadChatId;

    public OpinionLastRead(Long opinionId, boolean isAdmin, ObjectId lastReadChatId) {
        this.opinionId = opinionId;
        this.isAdmin = isAdmin;
        this.lastReadChatId = lastReadChatId;
    }
}
