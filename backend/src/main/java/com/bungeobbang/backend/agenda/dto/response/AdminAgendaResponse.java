package com.bungeobbang.backend.agenda.dto.response;

public record AdminAgendaResponse(
        AgendaResponse agenda,
        boolean hasNewMessage
) {
}
