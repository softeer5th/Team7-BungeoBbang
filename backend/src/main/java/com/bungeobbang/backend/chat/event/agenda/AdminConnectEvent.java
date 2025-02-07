package com.bungeobbang.backend.chat.event.agenda;

import org.springframework.web.socket.WebSocketSession;

public record AdminConnectEvent(
        WebSocketSession session,
        Long adminId
) {
}
