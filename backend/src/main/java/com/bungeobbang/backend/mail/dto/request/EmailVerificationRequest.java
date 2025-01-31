package com.bungeobbang.backend.mail.dto.request;

public record EmailVerificationRequest(
        String email,
        String code
) {
}
