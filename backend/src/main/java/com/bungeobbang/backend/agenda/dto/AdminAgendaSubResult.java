package com.bungeobbang.backend.agenda.dto;

import org.bson.types.ObjectId;

public record AdminAgendaSubResult(
        boolean hasNewMessage,
        ObjectId lastReadChatId

) {

}
