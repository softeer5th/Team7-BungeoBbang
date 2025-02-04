package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.bungeobbang.backend.common.util.ObjectIdTimestampConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

public record AgendaChatResponse(
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId chatId,
        Long agendaId,
        String chat,
        List<String> images,
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        boolean isAdmin,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Long memberId,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt

) {

    public static AgendaChatResponse from(AgendaChat chat) {
        return new AgendaChatResponse(
                chat.getId(),
                chat.getAgendaId(),
                chat.getChat(),
                chat.getImages(),
                chat.isAdmin(),
                chat.getMemberId(),
                ObjectIdTimestampConverter.getLocalDateTimeFromObjectId(chat.getId())
        );
    }
}
