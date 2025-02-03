package com.bungeobbang.backend.common.config;

import com.bungeobbang.backend.auth.member.MemberLoginArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class LoginResolverConfig implements WebMvcConfigurer {

    private final MemberLoginArgumentResolver memberLoginArgumentResolver;

    public LoginResolverConfig(MemberLoginArgumentResolver memberLoginArgumentResolver) {
        this.memberLoginArgumentResolver = memberLoginArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(memberLoginArgumentResolver);
    }
}