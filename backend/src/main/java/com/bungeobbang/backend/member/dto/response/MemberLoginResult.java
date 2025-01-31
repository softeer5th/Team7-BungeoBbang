package com.bungeobbang.backend.member.dto.response;

public record MemberLoginResult(
        Long memberId,
        boolean isEmailVerified,
        String accessToken,
        String refreshToken) {
}
