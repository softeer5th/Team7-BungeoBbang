package com.bungeobbang.backend.member.service;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.service.RedisService;
import com.bungeobbang.backend.member.dto.response.LoginResponse;
import com.bungeobbang.backend.member.infrastructure.JwtProvider;
import com.bungeobbang.backend.member.domain.*;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.bungeobbang.backend.common.exception.ErrorCode.MEMBER_CREATION_FAILED;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final OauthProviders oauthProviders;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;

    public LoginResponse login(final ProviderType providerType, final String code) {
        log.info("Login provider type: {}, code: {}", providerType, code);
        final OauthProvider oauthProvider = oauthProviders.mapping(providerType);
        final OauthUserInfo oauthUserInfo = oauthProvider.getUserInfo(code);
        final Member member = findOrCreateMember(oauthUserInfo.getSocialLoginId(), providerType);
        log.info("member: {}", member);
        return getLoginResultResponse(member);
    }

    private LoginResponse getLoginResultResponse(final Member member) {
        if (member.getUniversity() == null) {
            return new LoginResponse(member.getId(), false, null, null);
        }
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(member.getId().toString());
        saveRefreshToken(member, memberTokens.getRefreshToken());

        return new LoginResponse(member.getId(), true, memberTokens.getAccessToken(), memberTokens.getRefreshToken());
    }

    private void saveRefreshToken(final Member member, final String refreshToken) {
        redisService.setex(String.format("refreshToken%s", member.getId()), 604800L, refreshToken);
        log.info("saved refreshToken = {}", redisService.get(String.format("refreshToken%s", member.getId())));
    }

    private Member findOrCreateMember(final String socialLoginId, final ProviderType providerType) {
        return memberRepository.findByLoginId(socialLoginId)
                .orElseGet(() -> createMember(socialLoginId, providerType));
    }

    private Member createMember(final String socialLoginId, final ProviderType providerType) {
        if (memberRepository.existsByLoginId(socialLoginId)) {
            throw new AuthException(MEMBER_CREATION_FAILED);
        }
        final Member member = memberRepository.save(new Member(socialLoginId, providerType));
        log.debug("saved member = {}", member);
        return member;
    }
}