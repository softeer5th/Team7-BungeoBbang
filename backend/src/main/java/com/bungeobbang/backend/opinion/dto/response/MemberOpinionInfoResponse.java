package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;

import java.time.LocalDateTime;

public record MemberOpinionInfo(
public record MemberOpinionInfoResponse(
        Long opinionId,
        OpinionType opinionType,
        CategoryType categoryType,
        String lastChat,
        LocalDateTime lastChatTime,
        Boolean isNew
) {
}
