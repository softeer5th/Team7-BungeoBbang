package com.bungeobbang.backend.admin.dto.request;

import jakarta.validation.constraints.NotNull;

public record AdminLoginRequest(
        @NotNull
        String loginId,
        @NotNull
        String password
) {
}