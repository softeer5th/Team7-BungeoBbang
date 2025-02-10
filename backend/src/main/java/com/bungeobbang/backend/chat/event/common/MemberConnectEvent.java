package com.bungeobbang.backend.chat.event.common;

import org.springframework.web.socket.WebSocketSession;

public record MemberConnectEvent(
        WebSocketSession session,
        Long memberId
) {
}
