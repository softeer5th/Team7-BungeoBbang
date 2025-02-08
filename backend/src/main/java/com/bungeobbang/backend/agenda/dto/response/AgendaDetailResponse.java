package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.common.type.CategoryType;

import java.time.LocalDate;
import java.util.List;

public record AgendaDetailResponse(
        Long agendaId,
        CategoryType categoryType,
        String title,
        LocalDate startDate,
        LocalDate endDate,
        int count,
        String content,
        List<String> images,
        String adminName
) {
    public static AgendaDetailResponse from(Agenda agenda) {
        return new AgendaDetailResponse(
                agenda.getId(),
                agenda.getCategoryType(),
                agenda.getTitle(),
                agenda.getStartDate(),
                agenda.getEndDate(),
                agenda.getCount(),
                agenda.getContent(),
                agenda.getImages().stream().map(AgendaImage::getName).toList(),
                agenda.getAdmin().getName()
        );
    }
}
