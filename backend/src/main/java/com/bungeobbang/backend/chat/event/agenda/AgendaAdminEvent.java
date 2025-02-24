package com.bungeobbang.backend.chat.event.agenda;

import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.type.SocketEventType;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.List;

public record AgendaAdminEvent(
        WebSocketSession session,
        AdminWebsocketMessage websocketMessage,
        Long agendaId,
        SocketEventType eventType,
        Long adminId,
        String chat,
        List<String> images,
        LocalDateTime createdAt
) {
    public static AgendaAdminEvent from(WebSocketSession session, AdminWebsocketMessage message) {
        return new AgendaAdminEvent(
                session,
                message,
                message.agendaId(),
                message.event(),
                message.adminId(),
                message.message(),
                message.images(),
                message.createdAt()
        );
    }
}
