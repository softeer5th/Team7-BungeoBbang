package com.bungeobbang.backend.opinion.domain;

import jakarta.persistence.Id;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document("opinion_last_read")
public class OpinionLastRead {

    @Id
    private ObjectId id;

    private Long opinionId;

    private boolean isAdmin;

    private ObjectId lastReadChatId;

    public OpinionLastRead(Long opinionId, boolean isAdmin, ObjectId lastReadChatId) {
        this.opinionId = opinionId;
        this.isAdmin = isAdmin;
        this.lastReadChatId = lastReadChatId;
    }

    public void updateLastReadChatId(ObjectId lastReadChatId) {
        this.lastReadChatId = lastReadChatId;
    }
}
