package com.bungeobbang.backend.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record MemberUniversityUpdateRequest(
        @NotNull
        Long memberId,
        @NotNull
        Long universityId,
        @NotNull
        @Email
        String email
) {
}
