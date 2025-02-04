package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

@Builder
public record MemberOpinionInfoResponse(
        Long opinionId,
        OpinionType opinionType,
        CategoryType categoryType,
        ObjectId lastChatId,
        String lastChat,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime lastChatCreatedAt,
        Boolean hasNewChat
) implements Comparable<MemberOpinionInfoResponse> {
    @Override
    public int compareTo(MemberOpinionInfoResponse o) {
        return o.lastChatId.compareTo(this.lastChatId);
    }
}
