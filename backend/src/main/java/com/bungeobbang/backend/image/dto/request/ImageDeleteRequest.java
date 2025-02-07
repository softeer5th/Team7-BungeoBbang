package com.bungeobbang.backend.image.dto.request;

import java.util.List;

public record ImageDeleteRequest(
        List<String> images
) {
}
