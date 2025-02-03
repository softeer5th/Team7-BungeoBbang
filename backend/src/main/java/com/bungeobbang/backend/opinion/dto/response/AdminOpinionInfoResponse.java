package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record AdminOpinionInfoResponse(
        Long opinionId,
        OpinionType opinionType,
        CategoryType categoryType,
        String lastChat,
        LocalDateTime lastChatCreatedAt,
        Boolean isNew,
        Boolean isRemind
) implements Comparable<AdminOpinionInfoResponse> {
    @Override
    public int compareTo(AdminOpinionInfoResponse o) {
        return o.lastChatCreatedAt.compareTo(this.lastChatCreatedAt);
    }
}