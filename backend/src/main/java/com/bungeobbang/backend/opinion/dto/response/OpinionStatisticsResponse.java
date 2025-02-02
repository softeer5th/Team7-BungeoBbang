package com.bungeobbang.backend.opinion.dto.response;

public record OpinionStatisticsResponse(
        Long opinionCount,
        Long responseCount
) {
}
