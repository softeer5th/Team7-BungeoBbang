package com.bungeobbang.backend.chat.service;

import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserSessionService {
    private static final String MEMBER_KEY = "MEMBER";
    private static final String ADMIN_KEY = "ADMIN";

    private final RedisCommands<String, String> redisCommands;
    private final Map<String, WebSocketSession> localSessionCache = new ConcurrentHashMap<>();

    public UserSessionService(RedisClient redisClient) {
        StatefulRedisConnection<String, String> connection = redisClient.connect();
        this.redisCommands = connection.sync();
    }

    // MEMBER 세션 저장
    public void saveMemberSession(Long memberId, WebSocketSession session) {
        saveSession(MEMBER_KEY, String.valueOf(memberId), session);
    }

    // ADMIN 세션 저장
    public void saveAdminSession(Long adminId, WebSocketSession session) {
        saveSession(ADMIN_KEY, String.valueOf(adminId), session);
    }

    private void saveSession(String hashKey, String fieldKey, WebSocketSession session) {
        try {
            // Redis에 Hash에 세션 저장
            redisCommands.hset(hashKey, fieldKey, session.getId());

            // 로컬 캐싱 (hashKey와 fieldKey 조합)
            localSessionCache.put(hashKey + ":" + fieldKey, session);

            log.info("✅ [Redis] 세션 저장 - Hash: {}, Field: {}, Session ID: {}", hashKey, fieldKey, session.getId());
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 저장 실패: {}", e.getMessage());
        }
    }

    // MEMBER 세션 조회
    public WebSocketSession getMemberSession(Long memberId) {
        return getSession(MEMBER_KEY, String.valueOf(memberId));
    }

    // ADMIN 세션 조회
    public WebSocketSession getAdminSession(Long adminId) {
        return getSession(ADMIN_KEY, String.valueOf(adminId));
    }

    public List<WebSocketSession> getAllAdminSessions() {
        // Redis에서 모든 ADMIN 세션 키 조회
        List<String> adminKeys = redisCommands.hkeys(ADMIN_KEY);

        // Redis에서 세션 ID를 조회하고 로컬 캐시에서 WebSocketSession 매핑
        return adminKeys.stream()
                .map(adminId -> {
                    String sessionId = redisCommands.hget(ADMIN_KEY, adminId);
                    log.info("📌 [Redis] Admin 세션 조회 - adminId: {}, sessionId: {}", adminId, sessionId);

                    // 로컬 캐시에서 WebSocketSession 확인
                    return localSessionCache.get(String.format("%s:%s", ADMIN_KEY, adminId));
                })
                .filter(session -> session != null && session.isOpen()) // 유효한 세션만 필터링
                .collect(Collectors.toList());
    }

    private WebSocketSession getSession(String hashKey, String fieldKey) {
        String cacheKey = hashKey + ":" + fieldKey;
        WebSocketSession session = localSessionCache.get(cacheKey);
        if (session != null) return session;

        try {
            String sessionId = redisCommands.hget(hashKey, fieldKey);
            log.info("📌 [Redis] 세션 조회 - Hash: {}, Field: {}, Session ID: {}", hashKey, fieldKey, sessionId);
            return session;
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 조회 실패: {}", e.getMessage());
            return null;
        }
    }

    // MEMBER 세션 제거
    public void removeMemberSession(Long memberId) {
        removeSession(MEMBER_KEY, String.valueOf(memberId));
    }

    // ADMIN 세션 제거
    public void removeAdminSession(Long adminId) {
        removeSession(ADMIN_KEY, String.valueOf(adminId));
    }

    private void removeSession(String hashKey, String fieldKey) {
        String cacheKey = hashKey + ":" + fieldKey;
        try {
            // Redis에서 삭제
            redisCommands.hdel(hashKey, fieldKey);

            // 로컬 캐시에서 삭제
            localSessionCache.remove(cacheKey);
            log.info("🚫 [Redis] 세션 삭제 - Hash: {}, Field: {}", hashKey, fieldKey);
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 삭제 실패: {}", e.getMessage());
        }
    }
}
