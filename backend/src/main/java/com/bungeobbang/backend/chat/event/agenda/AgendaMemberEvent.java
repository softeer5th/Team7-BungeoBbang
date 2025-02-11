package com.bungeobbang.backend.chat.event.agenda;

import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.type.SocketEventType;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.List;

public record AgendaMemberEvent(
        WebSocketSession session,
        MemberWebsocketMessage websocketMessage,
        Long agendaId,
        SocketEventType eventType,
        Long memberId,
        String chat,
        List<String> images,
        LocalDateTime createdAt
) {
    public static AgendaMemberEvent from(WebSocketSession session, MemberWebsocketMessage message) {
        return new AgendaMemberEvent(
                session,
                message,
                message.agendaId(),
                message.event(),
                message.memberId(),
                message.message(),
                message.images(),
                message.createdAt()
        );
    }
}
