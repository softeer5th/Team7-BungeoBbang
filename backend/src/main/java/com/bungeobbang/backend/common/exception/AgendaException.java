package com.bungeobbang.backend.common.exception;

public class AgendaException extends DomainException {

    public AgendaException(ErrorCode errorCode) {
        super(errorCode);
    }
}
