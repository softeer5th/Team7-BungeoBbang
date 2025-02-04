package com.bungeobbang.backend.opinion.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record OpinionChatResponse(
        ObjectId chatId,
        Long memberId,
        Long opinionId,
        String chat,
        Boolean isAdmin,
        List<String> images,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt
) {
}
