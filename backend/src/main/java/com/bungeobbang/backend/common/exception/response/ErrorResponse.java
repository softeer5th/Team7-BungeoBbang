package com.bungeobbang.backend.common.exception.response;

public record ErrorResponse(
        String message,
        int code
) {
}