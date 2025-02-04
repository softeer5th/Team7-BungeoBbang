package com.bungeobbang.backend.agenda.dto.response;

import org.bson.types.ObjectId;

public record LastReadChat(
        ObjectId chatId
) {
}