package com.bungeobbang.backend.member.dto.request;

public record MemberUniversityUpdateRequest(
        Long memberId,
        Long universityId,
        String email
) {
}
