package com.bungeobbang.backend.common.exception;

import org.springframework.http.HttpStatus;

public class DomainException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public DomainException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

    public DomainException(ErrorCode errorCode, Object... args) {
        this.errorCode = errorCode;
        this.message = String.format(errorCode.getMessage(), args);
    }

    public String getMessage() {
        return this.message;
    }

    public HttpStatus getHttpStatus() {
        return errorCode.getHttpStatus();
    }

    public int getCode() {
        return errorCode.getCode();
    }
}
