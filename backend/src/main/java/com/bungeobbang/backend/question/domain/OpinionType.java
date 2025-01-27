package com.bungeobbang.backend.question.domain;

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
}
