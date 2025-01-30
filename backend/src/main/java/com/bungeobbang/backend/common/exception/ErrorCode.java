package com.bungeobbang.backend.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Auth
    INVALID_AUTHORIZATION_CODE(HttpStatus.BAD_REQUEST, "유효하지 않은 인증 코드입니다."),
    NOT_SUPPORTED_OAUTH_SERVICE(HttpStatus.NOT_IMPLEMENTED, "해당 OAuth 서비스는 제공하지 않습니다."),
    OAUTH_ACCESS_TOKEN_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 어세스토큰을 받아오는 데에 실패하였습니다."),
    OAUTH_USER_INFO_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 사용자 정보를 받아오는 데에 실패하였습니다."),
    INVALID_ADMIN(HttpStatus.BAD_REQUEST, "존재하지 않는 관리자입니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
