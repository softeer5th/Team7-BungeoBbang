package com.bungeobbang.backend.agenda.dto;

import com.bungeobbang.backend.common.type.CategoryType;

import java.time.LocalDate;

public record MemberAgendaSubResult(
        Long agendaId,
        CategoryType categoryType,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        int count,
        boolean isParticipate
) {

}
