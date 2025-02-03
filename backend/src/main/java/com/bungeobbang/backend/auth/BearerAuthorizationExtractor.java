package com.bungeobbang.backend.auth;

import com.bungeobbang.backend.common.exception.AuthException;
import org.springframework.stereotype.Component;

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_ACCESS_TOKEN;

@Component
public class BearerAuthorizationExtractor {
    private static final String BEARER_TYPE = "Bearer ";

    public String extractAccessToken(String header) {
        if (header != null && header.startsWith(BEARER_TYPE)) {
            return header.substring(BEARER_TYPE.length()).trim();
        }
        throw new AuthException(INVALID_ACCESS_TOKEN);
    }
}
