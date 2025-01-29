package com.bungeobbang.backend.member.domain.repository;

import com.bungeobbang.backend.common.infrastructure.RedisClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {
    private static final String REFRESH_TOKEN_KEY = "refreshToken";
    private final RedisClient redisClient;

    public void saveRefreshToken(String memberId, String refreshToken) {
        redisClient.setex(REFRESH_TOKEN_KEY + memberId, 604800L, refreshToken);
    }

    public String getRefreshToken(String memberId) {
        return redisClient.get(REFRESH_TOKEN_KEY + memberId);
    }
}
