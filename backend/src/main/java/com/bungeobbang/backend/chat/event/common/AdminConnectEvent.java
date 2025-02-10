package com.bungeobbang.backend.chat.event.common;

import org.springframework.web.socket.WebSocketSession;

public record AdminConnectEvent(
        WebSocketSession session,
        Long adminId
) {
}
