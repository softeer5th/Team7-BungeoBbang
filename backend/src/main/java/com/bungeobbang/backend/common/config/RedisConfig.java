package com.bungeobbang.backend.common.config;

import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedisConfig {
    private final String REDIS_HOST;
    private final int REDIS_PORT;
    private final String REDIS_USERNAME;
    private final String REDIS_PASSWORD;

    public RedisConfig(
            @Value("${spring.data.redis.host}") String redisHost,
            @Value("${spring.data.redis.port}") int redisPort,
            @Value("${spring.data.redis.username}") String redisUsername,
            @Value("${spring.data.redis.password}") String redisPassword) {
        this.REDIS_HOST = redisHost;
        this.REDIS_PORT = redisPort;
        this.REDIS_USERNAME = redisUsername;
        this.REDIS_PASSWORD = redisPassword;
    }

    @Bean
    public RedisClient redisClients() {
        RedisURI redisURI = RedisURI.Builder.redis(REDIS_HOST)
                .withPort(REDIS_PORT)
                .withAuthentication(REDIS_USERNAME, REDIS_PASSWORD)
                .build();
        return RedisClient.create(redisURI);
    }

    @Bean
    public StatefulRedisConnection<String, String> redisConnection(RedisClient redisClient) {
        return redisClient.connect();
    }

    @Bean
    public RedisCommands<String, String> redisCommands(StatefulRedisConnection<String, String> connection) {
        return connection.sync();
    }
}
