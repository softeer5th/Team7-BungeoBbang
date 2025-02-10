package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.common.type.CategoryType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record MyAgendaResponse(
        Agenda agenda,
        @JsonIgnore
        ObjectId lastChatId,
        LastChat lastChat,
        boolean hasNewChat
) {
    @Builder
    public static MyAgendaResponse of(ObjectId lastChatId, Long agendaId, String title, CategoryType categoryType, int count, boolean isEnd, String lastChat, LocalDateTime createdAt, boolean hasNew) {
        return new MyAgendaResponse(
                new Agenda(agendaId, title, categoryType, count, isEnd),
                lastChatId,
                new LastChat(lastChat, createdAt),
                hasNew
        );
    }

    public record Agenda(
            Long id,
            String title,
            CategoryType categoryType,
            int count,
            boolean isEnd
    ) {

    }

    public record LastChat(
            String content,
            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            LocalDateTime createdAt
    ) {
    }
}