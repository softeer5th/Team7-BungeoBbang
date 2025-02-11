package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record MemberOpinionInfoResponse(
        Long opinionId,
        OpinionType opinionType,
        CategoryType categoryType,
        String lastChat,
        LocalDateTime lastChatCreatedAt,
        Boolean isNew
) implements Comparable<MemberOpinionInfoResponse> {
    @Override
    public int compareTo(MemberOpinionInfoResponse o) {
        return o.lastChatCreatedAt.compareTo(this.lastChatCreatedAt);
    }
}
