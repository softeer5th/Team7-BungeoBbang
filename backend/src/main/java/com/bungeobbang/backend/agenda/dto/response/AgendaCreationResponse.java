package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.agenda.domain.Agenda;

public record AgendaCreationResponse(
        Long agendaId
) {
    public static AgendaCreationResponse from(Agenda save) {
        return new AgendaCreationResponse(save.getId());
    }
}
