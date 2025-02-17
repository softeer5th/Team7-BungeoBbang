package com.bungeobbang.backend.agenda.dto.response.admin;

import com.bungeobbang.backend.common.type.CategoryType;

public record AgendaCategoryResponse(
        CategoryType categoryType,
        Long count
) {
}