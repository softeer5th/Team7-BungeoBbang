package com.bungeobbang.backend.common.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Service
@RequiredArgsConstructor
public class RedisClient {

    private final JedisPool jedisPool;

    public void setex(final String key, final Long seconds, final String value) {
        Jedis jedis = jedisPool.getResource();
        jedis.setex(key, seconds, value);
    }

    public String get(final String key) {
        Jedis jedis = jedisPool.getResource();
        return jedis.get(key);
    }
}
