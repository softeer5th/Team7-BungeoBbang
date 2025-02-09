package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.chat.event.agenda.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.type.SocketEventType;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.List;

public record OpinionAdminEvent (
    WebSocketSession session,
    Long opinionId,
    SocketEventType eventType,
    Long adminId,
    String chat,
    List<String> images,
    LocalDateTime createdAt
) {
    public static OpinionAdminEvent from(WebSocketSession session, AdminWebsocketMessage message) {
        return new OpinionAdminEvent(
                session,
                message.opinionId(),
                message.event(),
                message.adminId(),
                message.message(),
                message.images(),
                message.createdAt()
        );
    }
}
