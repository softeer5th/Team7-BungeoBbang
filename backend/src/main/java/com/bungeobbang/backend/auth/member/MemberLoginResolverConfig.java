package com.bungeobbang.backend.auth.member;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class MemberLoginResolverConfig implements WebMvcConfigurer {

    private final MemberLoginArgumentResolver memberLoginArgumentResolver;

    public MemberLoginResolverConfig(MemberLoginArgumentResolver memberLoginArgumentResolver) {
        this.memberLoginArgumentResolver = memberLoginArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(memberLoginArgumentResolver);
    }
}