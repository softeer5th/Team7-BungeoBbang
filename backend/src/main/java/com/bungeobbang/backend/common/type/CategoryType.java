package com.bungeobbang.backend.common.type;

import lombok.Getter;

@Getter
public enum CategoryType {
    ACADEMICS("학사"),
    FACILITIES("시설・환경"),
    BUDGET("예산"),
    CLUBS("동아리"),
    EVENTS("행사"),
    IT("정보・통신"),
    TRANSPORTATION("교통"),
    OTHER("기타");

    private final String description;

    CategoryType(String description) {
        this.description = description;
    }

}
