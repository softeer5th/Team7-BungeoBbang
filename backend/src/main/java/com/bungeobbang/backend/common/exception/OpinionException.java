package com.bungeobbang.backend.common.exception;

public class OpinionException extends DomainException{

    public OpinionException(ErrorCode errorCode) {
        super(errorCode);
    }
}
