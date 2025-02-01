package com.bungeobbang.backend.auth.domain;

public record Accessor(
        Long id,
        Long universityId,
        Authority authority
) {
}