package com.bungeobbang.backend.opinion.dto.request;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.OpinionType;

import java.util.List;

public record OpinionCreationRequest(
        OpinionType opinionType,
        CategoryType categoryType,
        String content,
        List<String> images
) {
}
