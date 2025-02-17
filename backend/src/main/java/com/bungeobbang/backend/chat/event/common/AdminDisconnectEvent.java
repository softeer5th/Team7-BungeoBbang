package com.bungeobbang.backend.chat.event.common;

import org.springframework.web.socket.WebSocketSession;

public record AdminDisconnectEvent(
        WebSocketSession session,
        Long adminId
) {
}
