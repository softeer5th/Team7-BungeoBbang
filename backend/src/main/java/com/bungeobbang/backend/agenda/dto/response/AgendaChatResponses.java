package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.v3.oas.annotations.media.Schema;
import org.bson.types.ObjectId;

import java.util.List;

@Schema(description = "답해요 채팅 응답 DTO with 마지막 읽은 채팅")
public record AgendaChatResponses(
        @JsonInclude(JsonInclude.Include.NON_NULL)
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId,
        List<AgendaChatResponse> chat
) {
}
