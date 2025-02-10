package com.bungeobbang.backend.common.exception;

public class ImageException extends DomainException {

    public ImageException(ErrorCode errorCode) {
        super(errorCode);
    }
}
