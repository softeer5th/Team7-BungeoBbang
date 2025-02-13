package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import lombok.Builder;

import java.util.Map;

public record AdminOpinionStatisticsResponse(
        Long opinionCount,      // 총 의견 개수
        Long answerCount,       // 총 답변 개수
        Integer answerRate,      // 답변률 (%)
        Map<CategoryType, Integer> categoryTypeCounts,  // 각 CategoryType별 의견 수
        Map<OpinionType, Integer> opinionTypeCounts    // 각 OpinionType별 의견 수
) {

    @Builder
    public static AdminOpinionStatisticsResponse of(
            Long opinionCount, Long answerCount,
            Map<CategoryType, Integer> categoryTypeCounts,
            Map<OpinionType, Integer> opinionTypeCounts) {

        int answerRate = (opinionCount == 0) ? 0 : (int) Math.round((answerCount / (double) opinionCount) * 100);

        return new AdminOpinionStatisticsResponse(
                opinionCount,
                answerCount,
                answerRate,
                categoryTypeCounts,
                opinionTypeCounts
        );
    }
}
