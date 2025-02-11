package com.bungeobbang.backend.opinion.dto.response;

public record OpinionStatisticsResponse(
        Integer opinionCount,
        Integer adminResponseRate
) {
}
