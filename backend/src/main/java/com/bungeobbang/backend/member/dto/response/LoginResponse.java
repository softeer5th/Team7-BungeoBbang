package com.bungeobbang.backend.member.dto.response;

public record LoginResponse(Long memberId, Boolean isEmailVerified, String accessToken, String refreshToken) {
}
