package com.bungeobbang.backend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://onu-univ.site", "https://onu-univ.site")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true)
                .allowedHeaders(HttpHeaders.COOKIE, HttpHeaders.SET_COOKIE, "refresh-token", HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
                .exposedHeaders(HttpHeaders.LOCATION, "access-token", "refresh-token", HttpHeaders.SET_COOKIE);
        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}