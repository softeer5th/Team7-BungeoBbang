package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import org.springframework.web.socket.WebSocketSession;

public record OpinionAdminEvent (
    WebSocketSession session,
    AdminWebsocketMessage websocketMessage
) {
    public static OpinionAdminEvent from(WebSocketSession session, AdminWebsocketMessage message) {
        return new OpinionAdminEvent(
                session,
                message
        );
    }
}
