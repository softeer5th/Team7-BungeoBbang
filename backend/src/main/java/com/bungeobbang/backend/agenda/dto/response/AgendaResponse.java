package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;

import java.time.LocalDate;

public record AgendaResponse(
        Long agendaId,
        CategoryType categoryType,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        int count
) {
}
