package com.bungeobbang.backend.common.exception;

public class BadWordException extends DomainException {

    public BadWordException(ErrorCode errorCode, String badWord) {
        super(errorCode, badWord);
    }
}
