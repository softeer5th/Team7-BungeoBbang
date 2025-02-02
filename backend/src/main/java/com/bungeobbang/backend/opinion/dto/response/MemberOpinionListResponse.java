package com.bungeobbang.backend.opinion.dto.response;

import java.util.List;

public record MemberOpinionListResponse(
        List<MemberOpinionInfo> opinions,
        Long cursor,
        boolean hasNextPage
) {
}