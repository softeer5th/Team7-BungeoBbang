package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.bungeobbang.backend.common.util.ObjectIdTimestampConverter;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

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
        public static OpinionChatResponse of(OpinionChat opinionChat, Long userId, Long opinionId) {
                return new OpinionChatResponse(
                        opinionChat.getId(),
                        userId,
                        opinionId,
                        opinionChat.getChat(),
                        opinionChat.isAdmin(),
                        opinionChat.getImages(),
                        ObjectIdTimestampConverter.getLocalDateTimeFromObjectId(opinionChat.getId())
                );
        }
}
