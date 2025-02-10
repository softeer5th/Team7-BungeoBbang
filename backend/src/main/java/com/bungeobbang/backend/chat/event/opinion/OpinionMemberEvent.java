package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.type.SocketEventType;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.List;

public record OpinionMemberEvent(
        WebSocketSession session,
        Long opinionId,
        SocketEventType eventType,
        Long memberId,
        String chat,
        List<String> images,
        LocalDateTime createdAt
) {
    public static OpinionMemberEvent from(WebSocketSession session, MemberWebsocketMessage message) {
        return new OpinionMemberEvent(
                session,
                message.opinionId(),
                message.event(),
                message.memberId(),
                message.message(),
                message.images(),
                message.createdAt()
        );
    }
}
