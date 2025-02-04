package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Builder
public record AdminOpinionInfoResponse(
        Long opinionId,
        OpinionType opinionType,
        CategoryType categoryType,
        ObjectId lastChatId,
        String lastChat,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime lastChatCreatedAt,
        Boolean hasNewChat,
        Boolean isRemind
) implements Comparable<AdminOpinionInfoResponse> {
    @Override
    public int compareTo(AdminOpinionInfoResponse o) {
        return o.lastChatId.compareTo(this.lastChatId);
    }
}