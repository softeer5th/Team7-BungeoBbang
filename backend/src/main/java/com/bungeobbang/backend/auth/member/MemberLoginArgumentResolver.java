package com.bungeobbang.backend.auth.member;

import com.bungeobbang.backend.auth.BearerAuthorizationExtractor;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.common.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@Component
public class MemberLoginArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtProvider jwtProvider;
    private final BearerAuthorizationExtractor extractor;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Auth.class) &&
                parameter.getParameterType().equals(Accessor.class);
    }

    @Override
    public Accessor resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory) {

        try {
            final String accessToken = extractor.extractAccessToken(webRequest.getHeader(AUTHORIZATION));
            jwtProvider.validateToken(accessToken);
            final Long memberId = Long.valueOf(jwtProvider.getSubject(accessToken));
            return new Accessor(memberId, Authority.MEMBER);
        }
        catch (AuthException e) {
            return new Accessor(0L, Authority.GUEST);
        }
    }
}
