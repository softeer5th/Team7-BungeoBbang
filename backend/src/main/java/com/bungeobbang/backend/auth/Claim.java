package com.bungeobbang.backend.auth;

public enum Claim {
    ROLE("role"),
    UUID("uuid"),
    ;
    private final String name;

    Claim(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
