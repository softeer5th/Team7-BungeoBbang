package com.bungeobbang.backend.opinion.dto.request;

import java.util.List;

public record OpinionCreationRequest(
        String type,
        String category,
        String content,
        List<String> images
) {
}
