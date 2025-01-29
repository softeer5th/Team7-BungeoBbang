package com.bungeobbang.backend.member.dto.response;

public record MemberLoginResponse(Long memberId, Boolean isEmailVerified, String accessToken, String refreshToken) {
}
