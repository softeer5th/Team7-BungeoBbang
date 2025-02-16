package com.bungeobbang.backend.chat.event.common;

import com.bungeobbang.backend.chat.type.RoomType;
import com.bungeobbang.backend.chat.type.SocketEventType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

public record MemberWebsocketMessage(
        @JsonInclude(JsonInclude.Include.NON_NULL)
        RoomType roomType,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        SocketEventType event,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Long opinionId,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Long agendaId,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String message,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        List<String> images,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Long memberId,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        int code
) {
    public MemberWebsocketMessage(SocketEventType event, String message, int code) {
        this(null, event, null, null, message, null, null, LocalDateTime.now(), code);
    }

    public static MemberWebsocketMessage createResponse(MemberWebsocketMessage request) {
        return new MemberWebsocketMessage(
                request.roomType,
                request.event,
                request.opinionId,
                request.agendaId,
                request.message,
                request.images,
                request.memberId,
                LocalDateTime.now(),
                0
        );
    }
}