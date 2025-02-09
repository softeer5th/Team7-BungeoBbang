package com.bungeobbang.backend.auth.domain.repository;

import com.bungeobbang.backend.auth.domain.Authority;
import io.lettuce.core.api.sync.RedisCommands;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {
    private final RedisCommands<String, String> redisCommands;

    @Value("${security.jwt.refresh-expiration-time}")
    private Long refreshExpirationTime;

    public void saveRefreshToken(Authority authority, String id, String refreshToken) {
        redisCommands.setex(String.format("%s_refreshToken_%s", authority, id), refreshExpirationTime, refreshToken);
    }

    public String getRefreshToken(Authority authority, String id) {
        return redisCommands.get(String.format("%s_refreshToken_%s", authority, id) + id);
    }
}
