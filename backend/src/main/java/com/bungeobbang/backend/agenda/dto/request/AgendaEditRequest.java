package com.bungeobbang.backend.agenda.dto.request;

import com.bungeobbang.backend.common.type.CategoryType;

import java.util.List;

public record AgendaEditRequest(
        String title,
        CategoryType categoryType,
        String content,
        List<String> images

) {
}
