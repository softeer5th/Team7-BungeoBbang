package com.bungeobbang.backend.member.service;

import com.bungeobbang.backend.common.service.RedisService;
import com.bungeobbang.backend.member.dto.MemberLoginResult;
import com.bungeobbang.backend.common.infrastructure.JwtProvider;
import com.bungeobbang.backend.member.domain.*;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.member.infrastructure.oauthprovider.OauthProvider;
import com.bungeobbang.backend.member.infrastructure.oauthprovider.OauthProviders;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final OauthProviders oauthProviders;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;

    public MemberLoginResult login(final ProviderType providerType, final String code) {
        log.info("Login provider type: {}, code: {}", providerType, code);
        final OauthProvider oauthProvider = oauthProviders.mapping(providerType);
        final OauthUserInfo oauthUserInfo = oauthProvider.getUserInfo(code);
        final Member member = findOrCreateMember(oauthUserInfo.getSocialLoginId(), providerType);
        log.info("member: {}", member);
        return getLoginResultResponse(member);
    }

    private MemberLoginResult getLoginResultResponse(final Member member) {
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(member.getId().toString());
        saveRefreshToken(member, memberTokens.refreshToken());
        return new MemberLoginResult(member.getId(), memberTokens.accessToken(), memberTokens.refreshToken());
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
        final Member member = memberRepository.save(new Member(socialLoginId, providerType));
        log.debug("saved member = {}", member);
        return member;
    }
}