package com.bungeobbang.backend.agenda.dto.request;

import java.time.LocalDateTime;
import java.util.List;

public record AgendaChatRequest(
        Long agendaId,
        Long memberId,
        String chat,
        List<String> images,
        LocalDateTime createdAt
) {
}
