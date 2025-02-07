package com.bungeobbang.backend.chat.event.agenda;

import com.bungeobbang.backend.chat.type.SocketEventType;

import java.util.List;

public record AgendaMemberEvent(
        Long agendaId,
        SocketEventType eventType,
        Long memberId,
        String chat,
        List<String> images
) {
    public static AgendaMemberEvent from(MemberWebsocketMessage message) {
        return new AgendaMemberEvent(
                message.agendaId(),
                message.event(),
                message.memberId(),
                message.message(),
                message.images()
        );
    }
}
