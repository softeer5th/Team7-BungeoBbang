package com.bungeobbang.backend.common.exception;

public class UuidException extends DomainException {

    public UuidException(ErrorCode errorCode) {
        super(errorCode);
    }
}