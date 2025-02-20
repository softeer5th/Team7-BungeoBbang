package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.bungeobbang.backend.common.util.ObjectIdTimestampConverter;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record AdminOpinionsInfoResponse(
        OpinionInfo opinion,
        OpinionLastChatInfo lastChat,
        boolean hasNewChat,
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId
) {
    public static AdminOpinionsInfoResponse of(Opinion opinion, OpinionChat lastChat, OpinionLastRead lastRead) {
        return new AdminOpinionsInfoResponse(
                new OpinionInfo(opinion.getId(), opinion.getOpinionType(), opinion.getCategoryType(), opinion.isRemind()),
                new OpinionLastChatInfo(lastChat.getId(), lastChat.getChat(), ObjectIdTimestampConverter.getLocalDateTimeFromObjectId(lastChat.getId())),
                lastChat.getId().compareTo(lastRead.getLastReadChatId()) > 0,
                lastRead.getLastReadChatId()
        );
    }

    public record OpinionInfo(
            Long id,
            OpinionType opinionType,
            CategoryType categoryType,
            boolean isReminded
    ) {
    }

    private record OpinionLastChatInfo(
            @JsonIgnore
            ObjectId chatId,
            String content,
            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            LocalDateTime createdAt
    ){
    }
}