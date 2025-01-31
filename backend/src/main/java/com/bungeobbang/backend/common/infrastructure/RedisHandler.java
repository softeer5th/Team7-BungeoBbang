package com.bungeobbang.backend.common.infrastructure;

import io.lettuce.core.api.sync.RedisCommands;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisHandler {

    private final RedisCommands<String, String> redisCommands;

    public void setex(final String key, final Long seconds, final String value) {
        redisCommands.setex(key, seconds, value);
    }

    public String get(final String key) {
        return redisCommands.get(key);
    }
}