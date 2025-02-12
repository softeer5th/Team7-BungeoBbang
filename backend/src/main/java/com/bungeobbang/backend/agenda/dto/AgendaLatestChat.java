package com.bungeobbang.backend.agenda.dto;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record AgendaLatestChat(
        Long agendaId,
        ObjectId chatId,
        String content,
        LocalDateTime createdAt,
        boolean hasNewChat,
        ObjectId lastReadChatId
) {
}