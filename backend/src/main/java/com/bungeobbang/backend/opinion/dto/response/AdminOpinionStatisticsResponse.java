package com.bungeobbang.backend.opinion.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.Map;

public record AdminOpinionStatisticsResponse(
        @Schema(description = "총 의견 개수", example = "100")
        Long opinionCount,

        @Schema(description = "총 답변 개수", example = "80")
        Long answerCount,

        @Schema(description = "답변률 (%)", example = "80")
        Integer answerRate,

        @Schema(description = "각 카테고리별 의견 수",
                example = "{\"ACADEMICS\": 20, \"FACILITIES\": 15, \"BUDGET\": 10, \"EVENTS\": 5}")
        Map<CategoryType, Integer> categoryTypeCounts,

        @Schema(description = "각 의견 유형별 의견 수",
                example = "{\"IMPROVEMENT\": 30, \"NEED\": 25, \"SUGGESTION\": 20, \"INQUIRY\": 25}")
        Map<OpinionType, Integer> opinionTypeCounts
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
