package com.bungeobbang.backend.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record SocialLoginRequest(
        @NotNull String code
) {
}
