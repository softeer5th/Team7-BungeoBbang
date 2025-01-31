package com.bungeobbang.backend.member.domain;

import com.bungeobbang.backend.common.exception.AuthException;

import static com.bungeobbang.backend.common.exception.ErrorCode.NOT_SUPPORTED_OAUTH_SERVICE;

public enum ProviderType {
    KAKAO,
    GOOGLE;

    public static ProviderType fromString(String provider) {
        return switch (provider.toUpperCase()) {
            case "KAKAO" -> KAKAO;
            case "GOOGLE" -> GOOGLE;
            default -> throw new AuthException(NOT_SUPPORTED_OAUTH_SERVICE);
        };
    }
}
