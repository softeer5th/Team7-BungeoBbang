package com.bungeobbang.backend.common.exception;

public class CommonException extends DomainException {

    public CommonException(ErrorCode errorCode) {
        super(errorCode);
    }
}
