package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import org.springframework.web.socket.WebSocketSession;

public record OpinionMemberEvent(
        WebSocketSession session,
        MemberWebsocketMessage websocketMessage
) {
    public static OpinionMemberEvent from(WebSocketSession session, MemberWebsocketMessage message) {
        return new OpinionMemberEvent(
                session,
                message
        );
    }
}
