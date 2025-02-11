package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.agenda.domain.Agenda;

public record AgendaCreationResponse(
        Long agendaId
) {
    public static AgendaCreationResponse from(Agenda agenda) {
        return new AgendaCreationResponse(agenda.getId());
    }
}
