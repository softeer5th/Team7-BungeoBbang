package com.bungeobbang.backend.mail.domain.repository;

import io.lettuce.core.api.sync.RedisCommands;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmailVerificationCodeRepository {
    private static final Long VERIFICATION_CODE_EXPIRATION = 300L;
    private final RedisCommands<String, String> redisCommands;
    private static final String VERIFICATION_CODE_PREFIX = "verificationCode:";

    public void save(String email, String emailVerificationCode) {
        redisCommands.setex(VERIFICATION_CODE_PREFIX + email,
                VERIFICATION_CODE_EXPIRATION,
                emailVerificationCode);
    }

    public String findByEmail(String email) {
        return redisCommands.get(VERIFICATION_CODE_PREFIX + email);
    }
}
