package com.bungeobbang.backend.common.exception.handler;

import com.bungeobbang.backend.common.exception.DomainException;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DomainException.class)
    public ResponseEntity<ErrorResponse> handleDomainException(final DomainException e) {

        return ResponseEntity.status(e.getHttpStatus()).body(new ErrorResponse(e.getMessage()));
    }
}
