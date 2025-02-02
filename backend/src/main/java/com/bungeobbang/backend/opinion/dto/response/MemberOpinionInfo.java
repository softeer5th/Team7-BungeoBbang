package com.bungeobbang.backend.opinion.dto.response;

import java.time.LocalDateTime;

public record MemberOpinionInfo(
        Long opinionId,
        String type,
        String category,
        String lastChat,
        LocalDateTime lastChatTime,
        Boolean isNew
) {
}
