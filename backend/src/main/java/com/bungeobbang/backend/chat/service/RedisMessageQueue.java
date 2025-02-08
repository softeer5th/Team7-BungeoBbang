package com.bungeobbang.backend.chat.service;

import io.lettuce.core.RedisClient;
import io.lettuce.core.pubsub.RedisPubSubListener;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class RedisMessageQueue implements MessageQueueService {
    // ✅ 채널별 WebSocket 세션 목록 (WebSocket 세션별 구독 채널 관리)
    private final Map<String, Set<WebSocketSession>> channelSubscribers = new ConcurrentHashMap<>();
    private final RedisPubSubAsyncCommands<String, String> asyncCommands;


    public RedisMessageQueue(RedisClient redisClient) {
        // ✅ Redis Pub/Sub 연결 (하나의 연결을 공유)
        StatefulRedisPubSubConnection<String, String> pubSubConnection = redisClient.connectPubSub();
        this.asyncCommands = pubSubConnection.async();
        pubSubConnection.addListener(new RedisMessageQueue.RedisMessageHandler());
    }

    @Override
    public void publish(String channel, String message) {
        asyncCommands.publish(channel, message);
    }

    @Override
    public void subscribe(WebSocketSession session, String channel) {
        // 해당 채널이 처음 구독되면 Redis에 subscribe
        if (channelSubscribers.get(channel) == null) {
            asyncCommands.subscribe(channel);
            log.info("🔵 [Redis] 새로운 채널 구독: {}", channel);
        }

        channelSubscribers.computeIfAbsent(channel, k -> ConcurrentHashMap.newKeySet()).add(session);
    }

    @Override
    public void unsubscribe(WebSocketSession session, String topic) {
        channelSubscribers.get(topic).remove(session);
        if (channelSubscribers.get(topic).isEmpty()) {
            asyncCommands.unsubscribe(topic);
        }
    }

    @Override
    public void unsubscribe(String topic) {
        asyncCommands.unsubscribe(topic);
        channelSubscribers.remove(topic);
    }

    private class RedisMessageHandler implements RedisPubSubListener<String, String> {
        @Override
        public void message(String channel, String message) {
            try {
                log.info("📩 [Redis] 메시지 수신 (채널: {}): {}", channel, message);

                // 해당 채널을 구독 중인 모든 WebSocket 세션에 메시지 전달
                Set<WebSocketSession> subscribers = channelSubscribers.get(channel);
                if (subscribers != null) {
                    for (WebSocketSession session : subscribers) {
                        if (session.isOpen()) {
                            session.sendMessage(new TextMessage(message));
                        } else subscribers.remove(session); // 세션 종료된 경우 맵에서 삭제
                    }
                }
            } catch (Exception e) {
                log.error("❌ [Redis] 메시지 처리 실패: {}", e.getMessage());
            }
        }

        @Override
        public void message(String pattern, String channel, String message) {
        }

        @Override
        public void subscribed(String channel, long count) {
            log.info("✅ [Redis] 채널 구독 성공: {}", channel);
        }

        @Override
        public void unsubscribed(String channel, long count) {
            log.info("🚫 [Redis] 채널 구독 해제: {}", channel);
        }

        @Override
        public void psubscribed(String pattern, long count) {
        }

        @Override
        public void punsubscribed(String pattern, long count) {
        }
    }
}
