package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record OpinionChatResponse(
        @JsonSerialize(using = ObjectIdSerializer.class)
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
