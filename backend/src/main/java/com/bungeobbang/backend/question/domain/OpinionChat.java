package com.bungeobbang.backend.question.domain;

import org.bson.codecs.pojo.annotations.BsonProperty;

import java.time.LocalDateTime;

public class OpinionChat {
    @BsonProperty("memberId")
    private Long memberId;

    @BsonProperty("opinionId")
    private Long opinionId;

    @BsonProperty("chat")
    private String chat;

    @BsonProperty("images")
    private String[] images;

    @BsonProperty("isAdmin")
    private boolean isAdmin;

    @BsonProperty("createdAt")
    private LocalDateTime createdAt;
}
