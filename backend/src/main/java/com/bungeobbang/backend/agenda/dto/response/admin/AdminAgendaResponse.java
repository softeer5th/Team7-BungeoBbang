package com.bungeobbang.backend.agenda.dto.response.admin;

import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;

public record AdminAgendaResponse(
        AgendaResponse agenda,
        boolean hasNewMessage,
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId
) {
}
