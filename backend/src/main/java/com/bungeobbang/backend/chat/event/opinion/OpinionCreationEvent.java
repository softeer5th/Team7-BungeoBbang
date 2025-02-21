package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.chat.type.SocketEventType;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;

import java.time.LocalDateTime;

public record OpinionCreationEvent(
        SocketEventType eventType,
        CategoryType categoryType,
        OpinionType opinionType,
        Long opinionId,
        String message,
        LocalDateTime createdAt
) {
}
