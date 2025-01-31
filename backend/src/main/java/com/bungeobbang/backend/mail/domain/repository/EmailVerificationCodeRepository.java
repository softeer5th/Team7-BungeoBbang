package com.bungeobbang.backend.mail.domain.repository;

import com.bungeobbang.backend.common.infrastructure.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmailVerificationCodeRepository {
    private static final String VERIFICATION_CODE_PREFIX = "verificationCode:";
    private static final Long VERIFICATION_CODE_EXPIRATION = 300L;
    private final RedisHandler redisHandler;

    public void save(String email, String emailVerificationCode) {
        redisHandler.setex(VERIFICATION_CODE_PREFIX + email,
                VERIFICATION_CODE_EXPIRATION,
                emailVerificationCode);
    }

    public String findByEmail(String email) {
        return redisHandler.get(VERIFICATION_CODE_PREFIX + email);
    }
}
