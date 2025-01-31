package com.bungeobbang.backend.admin.domain.repository;

import com.bungeobbang.backend.common.infrastructure.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AdminRefreshTokenRepository {
    private static final String REFRESH_TOKEN_KEY = "adminRefreshToken";
    private final RedisHandler redisHandler;

    public void saveRefreshToken(String adminId, String refreshToken) {
        redisHandler.setex(REFRESH_TOKEN_KEY + adminId, 604800L, refreshToken);
    }

    public String getRefreshToken(String adminId) {
        return redisHandler.get(REFRESH_TOKEN_KEY + adminId);
    }
}
