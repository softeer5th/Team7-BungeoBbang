package com.bungeobbang.backend.member.dto.response;

public record MemberLoginResult(Long memberId, String accessToken, String refreshToken) {
}
