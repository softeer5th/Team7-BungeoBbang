package com.bungeobbang.backend.login.dto.response;

public record LoginResponse(Long memberId, Boolean isEmailVerified, String accessToken, String refreshToken) {
}
