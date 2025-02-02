package com.bungeobbang.backend.common.type;

import com.bungeobbang.backend.common.exception.CommonException;
import com.bungeobbang.backend.common.exception.ErrorCode;
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

    public static CategoryType fromString(String category) {
        return switch (category) {
            case "학사" -> ACADEMICS;
            case "시설・환경" -> FACILITIES;
            case "예산" -> BUDGET;
            case "동아리" -> CLUBS;
            case "행사" -> EVENTS;
            case "정보・통신" -> IT;
            case "교통" -> TRANSPORTATION;
            case "기타" -> OTHER;
            default -> throw new CommonException(ErrorCode.INVALID_CATEGORY_TYPE);
        };
    }
}
