package com.bungeobbang.backend.agenda.dto.response;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record LastChat(
        Long agendaId,
        ObjectId chatId,
        String content,
        LocalDateTime createdAt
) {
}