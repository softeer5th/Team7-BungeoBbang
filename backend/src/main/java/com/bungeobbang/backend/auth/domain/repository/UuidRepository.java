package com.bungeobbang.backend.auth.domain.repository;

import com.bungeobbang.backend.auth.domain.Authority;
import io.lettuce.core.api.sync.RedisCommands;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UuidRepository {
    private static final String AUTH_UUID = "uuid";
    private final RedisCommands<String, String> redisCommands;
    @Value("${security.jwt.access-expiration-time}") Long accessExpirationTime;

    public void save(Authority role, String uuid, String id) {
        redisCommands.setex(String.format("%s_%s:%s", role, AUTH_UUID, id), accessExpirationTime + 1000, uuid);
    }

    public Optional<String> get(Authority role, String id) {
        return Optional.ofNullable(redisCommands.get(String.format("%s_%s:%s", role, AUTH_UUID, id)));
    }

    public void remove(Authority role, String id) {
        redisCommands.del(String.format("%s_%s:%s", role, AUTH_UUID, id));
    }
}
