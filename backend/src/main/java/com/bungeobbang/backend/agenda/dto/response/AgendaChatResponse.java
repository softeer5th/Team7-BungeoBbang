package com.bungeobbang.backend.agenda.dto.response;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.bungeobbang.backend.common.util.ObjectIdTimestampConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.v3.oas.annotations.media.Schema;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "답해요 채팅 응답 DTO")
public record AgendaChatResponse(

        @Schema(description = "채팅 ID (ObjectId)", example = "65a3f8e2b93e4c23dc8e3a90")
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId chatId,

        @Schema(description = "답해요 ID", example = "123")
        Long agendaId,

        @Schema(description = "채팅 내용", example = "학생이 질문합니다.")
        String chat,

        @Schema(description = "첨부 이미지 URL 리스트", example = "[\"https://example.com/image1.png\", \"https://example.com/image2.png\"]")
        List<String> images,

        @Schema(description = "관리자 여부 (true: 관리자)", example = "true")
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        boolean isAdmin,

        @Schema(description = "학생 ID (관리자가 보낸 경우 제외)", example = "1001", nullable = true)
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Long memberId,

        @Schema(description = "채팅 생성 시간", example = "2025-02-04 14:30:00")
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
