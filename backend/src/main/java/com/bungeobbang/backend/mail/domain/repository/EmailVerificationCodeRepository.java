package com.bungeobbang.backend.mail.domain.repository;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.infrastructure.RedisClient;
import com.bungeobbang.backend.mail.domain.EmailVerificationCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmailVerificationCodeRepository {
    private static final String VERIFICATION_CODE_PREFIX = "verificationCode:";
    private static final Long VERIFICATION_CODE_EXPIRATION = 300L;
    private final RedisClient redisClient;

    public void save(EmailVerificationCode emailVerificationCode) {
        redisClient.setex(VERIFICATION_CODE_PREFIX + emailVerificationCode.email(),
                VERIFICATION_CODE_EXPIRATION,
                emailVerificationCode.code());
    }

    public EmailVerificationCode findByEmail(String email) {
        final String code = redisClient.get(VERIFICATION_CODE_PREFIX + email);
        if (code == null)
            throw new AuthException(ErrorCode.EMAIL_CODE_EXPIRED);

        return new EmailVerificationCode(email, code);
    }
}
