package com.bungeobbang.backend.mail.domain;

public record EmailVerificationCode(
        String email,
        String code
) {

}
