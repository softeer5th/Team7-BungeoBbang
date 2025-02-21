package com.bungeobbang.backend.image.dto.response;

public record PresignedUrlResponse(
        String fileName,
        String presignedUrl
) {
}
