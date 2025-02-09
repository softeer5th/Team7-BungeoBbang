package com.bungeobbang.backend.chat.service;

import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class UserSessionService {
    private static final String MEMBER_KEY_PREFIX = "M_";
    private static final String ADMIN_KEY_PREFIX = "A_";

    private final RedisCommands<String, String> redisCommands;
    private final Map<String, WebSocketSession> localSessionCache = new ConcurrentHashMap<>();

    public UserSessionService(RedisClient redisClient) {
        StatefulRedisConnection<String, String> connection = redisClient.connect();
        this.redisCommands = connection.sync();
    }

    public void saveMemberSession(Long memberId, WebSocketSession session) {
        saveSession(MEMBER_KEY_PREFIX + memberId, session);
    }

    public void saveAdminSession(Long adminId, WebSocketSession session) {
        saveSession(ADMIN_KEY_PREFIX + adminId, session);
    }

    private void saveSession(String key, WebSocketSession session) {
        try {
            redisCommands.set(key, session.getId());
            localSessionCache.put(key, session); // 로컬 캐싱
            log.info("✅ [Redis] WebSocket 세션 저장 - key: {}, sessionId: {}", key, session.getId());
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 저장 실패: {}", e.getMessage());
        }
    }

    public WebSocketSession getMemberSession(Long memberId) {
        return getSession(MEMBER_KEY_PREFIX + memberId);
    }

    public WebSocketSession getAdminSession(Long adminId) {
        return getSession(ADMIN_KEY_PREFIX + adminId);
    }

    private WebSocketSession getSession(String key) {
        WebSocketSession session = localSessionCache.get(key);
        if (session != null) return session;

        try {
            String sessionId = redisCommands.get(key);
            log.info("📌 [Redis] WebSocket 세션 조회 - key: {}, sessionId: {}", key, sessionId);
            return session;
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 조회 실패: {}", e.getMessage());
            return null;
        }
    }

    public void removeMemberSession(Long memberId) {
        removeSession(MEMBER_KEY_PREFIX + memberId);
    }

    public void removeAdminSession(Long adminId) {
        removeSession(ADMIN_KEY_PREFIX + adminId);
    }

    private void removeSession(String key) {
        try {
            redisCommands.del(key);
            localSessionCache.remove(key);
            log.info("🚫 [Redis] WebSocket 세션 삭제 - key: {}", key);
        } catch (Exception e) {
            log.error("❌ [Redis] 세션 삭제 실패: {}", e.getMessage());
        }
    }
}
