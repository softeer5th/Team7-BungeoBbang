package com.bungeobbang.backend.agenda.dto.response.member;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record MyAgendaResponse(
        Agenda agenda,
        @JsonIgnore
        ObjectId lastChatId,
        LastChat lastChat,
        boolean hasNewChat,
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId
) {
    @Builder
    public static MyAgendaResponse of(ObjectId lastChatId, Long agendaId, String title, CategoryType categoryType, int count, boolean isEnd, String lastChat, LocalDateTime createdAt, boolean hasNew, ObjectId lastReadChatId) {
        return new MyAgendaResponse(
                new Agenda(agendaId, title, categoryType, count, isEnd),
                lastChatId,
                new LastChat(lastChat, createdAt),
                hasNew,
                lastReadChatId

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