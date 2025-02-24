package com.bungeobbang.backend.agenda.dto;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record LastChat(
        Long agendaId,
        ObjectId chatId,
        String content,
        LocalDateTime createdAt
) {
    public static String AGENDA_ID = "agendaId";
    public static String CHAT_ID = "chatId";
    public static String CONTENT = "content";
    public static String CREATED_AT = "createdAt";
}