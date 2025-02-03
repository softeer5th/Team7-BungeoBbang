package com.bungeobbang.backend.opinion.dto.response;

import java.util.List;

public record MemberOpinionInfoListResponse(
        List<MemberOpinionInfoResponse> opinions
) {
}