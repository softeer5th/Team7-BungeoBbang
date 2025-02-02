package com.bungeobbang.backend.opinion.domain;

import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import lombok.Getter;

@Getter
public enum OpinionType {
    IMPROVEMENT("개선되면 좋겠어요"),
    NEED("필요해요"),
    SUGGESTION("제안해요"),
    INQUIRY("궁금해요");

    private final String description;

    OpinionType(String description) {
        this.description = description;
    }

    public static OpinionType fromString(String type) {
        return switch (type.toUpperCase()) {
            case "개선되면 좋겠어요" -> IMPROVEMENT;
            case "필요해요" -> NEED;
            case "제안해요" -> SUGGESTION;
            case "궁금해요" -> INQUIRY;
            default -> throw new OpinionException(ErrorCode.INVALID_OPINION_TYPE);
        };
    }
}