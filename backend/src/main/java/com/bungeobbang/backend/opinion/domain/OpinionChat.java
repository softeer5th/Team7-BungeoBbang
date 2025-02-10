package com.bungeobbang.backend.opinion.domain;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Document(collection = "opinion_chat")
public class OpinionChat {

    @Id
    private ObjectId id;

    private Long memberId;

    private Long opinionId;

    private String chat;

    private List<String> images;

    private boolean isAdmin;

    private LocalDateTime createdAt;

    @Builder
    public OpinionChat(Long memberId, Long opinionId, String chat, List<String> images, boolean isAdmin, LocalDateTime createdAt) {
        this.memberId = memberId;
        this.opinionId = opinionId;
        this.chat = chat;
        this.images = images;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt;
    }
}
