package com.bungeobbang.backend.agenda.dto.response.admin;

import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;

public record AdminAgendaResponse(
        AgendaResponse agenda,
        boolean hasNewMessage
) {
}
