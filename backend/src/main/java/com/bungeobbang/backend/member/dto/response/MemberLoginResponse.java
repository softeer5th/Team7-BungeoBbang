package com.bungeobbang.backend.member.dto.response;

public record MemberLoginResponse(
        Long memberId,
        boolean isEmailVerified) {
}
