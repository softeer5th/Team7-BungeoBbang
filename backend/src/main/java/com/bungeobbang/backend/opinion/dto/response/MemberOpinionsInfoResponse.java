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


public record MemberOpinionsInfoResponse(
        OpinionInfo opinion,
        OpinionLastChatInfo lastChat,
        boolean hasNewChat,
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId
) implements Comparable<MemberOpinionsInfoResponse> {

    public static MemberOpinionsInfoResponse of(Opinion opinion, OpinionChat lastChat, OpinionLastRead lastRead) {
        return new MemberOpinionsInfoResponse(
                new OpinionInfo(opinion.getId(), opinion.getOpinionType(), opinion.getCategoryType()),
                new OpinionLastChatInfo(lastChat.getId(), lastChat.getChat(), ObjectIdTimestampConverter.getLocalDateTimeFromObjectId(lastChat.getId())),
                lastChat.getId().compareTo(lastRead.getLastReadChatId()) > 0,
                lastRead.getLastReadChatId()
        );
    }

    private record OpinionInfo(
            Long id,
            OpinionType opinionType,
            CategoryType categoryType
    ) {
    }

    public record OpinionLastChatInfo(
            @JsonIgnore
            ObjectId chatId,
            String content,
            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            LocalDateTime createdAt
    ){
    }

    @Override
    public int compareTo(MemberOpinionsInfoResponse o) {
        return o.lastChat.chatId().compareTo(this.lastChat.chatId());
    }
}