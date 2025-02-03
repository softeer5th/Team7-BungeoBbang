package com.bungeobbang.backend.opinion.dto.response;

import java.util.List;

public record AdminOpinionInfoListResponse(
        List<AdminOpinionInfoResponse> opinions
) {
}
