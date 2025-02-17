package com.bungeobbang.backend.chat.event.common;

import org.springframework.web.socket.WebSocketSession;

public record MemberDisconnectEvent(
        WebSocketSession session,
        Long memberId
) {
}
