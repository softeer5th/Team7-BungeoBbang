package com.bungeobbang.backend.mail.domain.repository;

import com.bungeobbang.backend.common.infrastructure.RedisClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmailVerificationCodeRepository {
    private static final String VERIFICATION_CODE_PREFIX = "verificationCode:";
    private static final Long VERIFICATION_CODE_EXPIRATION = 300L;
    private final RedisClient redisClient;

    public void save(String email, String emailVerificationCode) {
        redisClient.setex(VERIFICATION_CODE_PREFIX + email,
                VERIFICATION_CODE_EXPIRATION,
                emailVerificationCode);
    }

    public String findByEmail(String email) {
        return redisClient.get(VERIFICATION_CODE_PREFIX + email);
    }
}
