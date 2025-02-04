package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import lombok.Builder;

import java.time.LocalDateTime;

public record MyAgendaResponse(
        Agenda agenda,
        LastChat lastChat,
        boolean hasNew
) {
    @Builder
    public static MyAgendaResponse of(Long agendaId, String title, CategoryType categoryType, int count, boolean isEnd, String lastChat, LocalDateTime createdAt, boolean hasNew) {
        return new MyAgendaResponse(
                new Agenda(agendaId, title, categoryType, count, isEnd),
                new LastChat(lastChat, createdAt),
                hasNew
        );
    }

    private record Agenda(
            Long id,
            String title,
            CategoryType categoryType,
            int count,
            boolean isEnd
    ) {

    }

    private record LastChat(
            String content,
            LocalDateTime createdAt
    ) {
    }
}