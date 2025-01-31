package com.bungeobbang.backend.common.exception;

public class UniversityException extends DomainException {

    public UniversityException(ErrorCode errorCode) {
        super(errorCode);
    }
}
