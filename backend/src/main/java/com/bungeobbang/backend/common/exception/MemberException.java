package com.bungeobbang.backend.common.exception;

public class MemberException extends DomainException {

    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
