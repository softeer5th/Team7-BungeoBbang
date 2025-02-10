package com.bungeobbang.backend.auth.member;

import com.bungeobbang.backend.auth.BearerAuthorizationExtractor;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.UuidException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import static com.bungeobbang.backend.common.exception.ErrorCode.DUPLICATE_LOGIN;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_UUID;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@Component
public class MemberLoginArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtProvider jwtProvider;
    private static final String UUID = "uuid";
    private final BearerAuthorizationExtractor extractor;
    private final UuidRepository uuidRepository;

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
            final String memberId = jwtProvider.getSubject(accessToken);
            String expected = jwtProvider.getClaim(accessToken, UUID);
            String actual = uuidRepository.get(Authority.MEMBER, memberId)
                    .orElseThrow(() -> new AuthException(INVALID_UUID));
            validateUuid(actual, expected);
            return new Accessor(Long.valueOf(memberId), Authority.MEMBER);
        } catch (AuthException e) {
            return new Accessor(0L, Authority.GUEST);
        }
    }

    private void validateUuid(String actual, String expected) {
        if (!actual.equals(expected)) {
            throw new UuidException(DUPLICATE_LOGIN);
        }
    }
}
