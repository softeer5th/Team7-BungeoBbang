package com.bungeobbang.backend.chat.event.agenda;

import com.bungeobbang.backend.chat.type.SocketEventType;

import java.util.List;

public record AgendaAdminEvent(
        Long agendaId,
        SocketEventType eventType,
        Long adminId,
        String chat,
        List<String> images
) {
    public static AgendaAdminEvent from(AdminWebsocketMessage message) {
        return new AgendaAdminEvent(
                message.agendaId(),
                message.event(),
                message.adminId(),
                message.message(),
                message.images()
        );
    }
}
