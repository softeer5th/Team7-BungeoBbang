package com.bungeobbang.backend.opinion.domain;

import lombok.Getter;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OpinionChat {

    @BsonProperty("_id")
    private ObjectId id;

    @BsonProperty("member_id")
    private Long memberId;

    @BsonProperty("opinion_id")
    private Long opinionId;

    @BsonProperty("chat")
    private String chat;

    @BsonProperty("images")
    private List<String> images;

    @BsonProperty("is_admin")
    private boolean isAdmin;

    @BsonProperty("created_at")
    private LocalDateTime createdAt;

    public OpinionChat(Long memberId, Long opinionId, String chat, List<String> images, boolean isAdmin, LocalDateTime createdAt) {
        this.memberId = memberId;
        this.opinionId = opinionId;
        this.chat = chat;
        this.images = images;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt;
    }
}
