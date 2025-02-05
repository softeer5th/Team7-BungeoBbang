package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.common.util.ObjectIdTimestampConverter;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record AdminOpinionsInfoResponse(
        OpinionInfo opinion,
        OpinionLastChatInfo lastChat,
        boolean hasNew
) implements Comparable<AdminOpinionsInfoResponse> {
    public static AdminOpinionsInfoResponse of(Opinion opinion, OpinionChat lastChat, OpinionLastRead lastRead) {
        return new AdminOpinionsInfoResponse(
                new OpinionInfo(opinion.getId(), opinion.getOpinionType(), opinion.getCategoryType(), opinion.isRemind()),
                new OpinionLastChatInfo(lastChat.getId(), lastChat.getChat(), ObjectIdTimestampConverter.getLocalDateTimeFromObjectId(lastChat.getId())),
                !lastRead.getLastReadChatId().equals(lastChat.getId())
        );
    }

    private record OpinionInfo(
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

    @Override
    public int compareTo(AdminOpinionsInfoResponse o) {
        // 1. isReminded가 true 이면 우선 조회
        int remindComparison = Boolean.compare(o.opinion.isReminded(), this.opinion.isReminded());
        if (remindComparison != 0) {
            return remindComparison;
        }
        // 2. 시간순(ObjectId)으로 정렬
        return o.lastChat.chatId().compareTo(lastChat.chatId());
    }
}