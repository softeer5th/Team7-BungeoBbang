package com.bungeobbang.backend.chat.event.agenda;

import org.springframework.web.socket.WebSocketSession;

public record MemberConnectEvent(
        WebSocketSession session,
        Long memberId
) {
}
