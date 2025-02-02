package com.bungeobbang.backend.common.exception;

public class AdminException extends DomainException {

    public AdminException(ErrorCode errorCode) {
        super(errorCode);
    }
}
