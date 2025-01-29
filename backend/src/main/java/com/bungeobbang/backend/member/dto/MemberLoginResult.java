package com.bungeobbang.backend.member.dto;

public record MemberLoginResult(Long memberId, String accessToken, String refreshToken) {
}
