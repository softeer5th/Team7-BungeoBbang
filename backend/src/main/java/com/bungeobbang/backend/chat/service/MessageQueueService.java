package com.bungeobbang.backend.chat.service;

import org.springframework.web.socket.WebSocketSession;

public interface MessageQueueService {
    void publish(String channel, String message);

    void subscribe(WebSocketSession session, String topic);
}
