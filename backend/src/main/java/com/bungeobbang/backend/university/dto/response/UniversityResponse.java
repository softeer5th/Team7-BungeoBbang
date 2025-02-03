package com.bungeobbang.backend.university.dto.response;

import com.bungeobbang.backend.university.domain.University;

public record UniversityResponse(
        Long id,
        String name,
        String domain
) {
    public static UniversityResponse from(University university) {
        return new UniversityResponse(
                university.getId(),
                university.getName(),
                university.getDomain()
        );
    }
}
