package com.bungeobbang.backend.agenda.dto.response.admin;

public record AgendaStatisticResponse(
        int agendaCount,
        int participateCount
) {
}
