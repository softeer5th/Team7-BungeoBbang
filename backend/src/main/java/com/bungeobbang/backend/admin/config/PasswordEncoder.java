package com.bungeobbang.backend.admin.config;

public interface PasswordEncoder {
    String encode(String rawPassword);

    boolean matches(String rawPassword, String encodedPassword);
}
