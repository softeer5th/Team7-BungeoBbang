package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;

import java.time.LocalDate;

public record MemberAgendaResponse(
        AgendaResponse agendaResponse,
        boolean isParticipate
) {
    public MemberAgendaResponse(Long agendaId, CategoryType categoryType, String title, LocalDate startDate, LocalDate endDate, int count, boolean isParticipate) {
        this(new AgendaResponse(agendaId, categoryType, title, startDate, endDate, count), isParticipate);
    }
}
