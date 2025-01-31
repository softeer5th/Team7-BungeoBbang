package com.bungeobbang.backend.common.exception;

public class AuthException extends DomainException {

    public AuthException(ErrorCode errorCode) {
        super(errorCode);
    }
}
