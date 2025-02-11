package com.bungeobbang.backend.auth.domain;

public record Accessor(
        Long id,
        Authority authority
) {

    public boolean isMember() {
        return Authority.MEMBER.equals(authority);
    }

    public boolean isAdmin() {
        return Authority.ADMIN.equals(authority);
    }
}