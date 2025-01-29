package com.bungeobbang.backend.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    INVALID_ADMIN(HttpStatus.BAD_REQUEST, "존재하지 않는 관리자입니다."),

    // Auth
    INVALID_AUTHORIZATION_CODE(HttpStatus.BAD_REQUEST, "유효하지 않은 인증 코드입니다."),
    NOT_SUPPORTED_OAUTH_SERVICE(HttpStatus.NOT_IMPLEMENTED, "해당 OAuth 서비스는 제공하지 않습니다."),
    MEMBER_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "회원 생성 중 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
