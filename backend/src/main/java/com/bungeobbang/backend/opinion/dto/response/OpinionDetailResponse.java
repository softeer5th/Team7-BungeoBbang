package com.bungeobbang.backend.opinion.dto.response;

public record OpinionDetailResponse(
        String universityName,
        boolean isReminded
) {
}