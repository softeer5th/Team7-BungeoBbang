package com.bungeobbang.backend.login.service;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.login.domain.*;
import com.bungeobbang.backend.login.dto.response.LoginResponse;
import com.bungeobbang.backend.login.infrastructure.JwtProvider;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import static com.bungeobbang.backend.common.exception.ErrorCode.MEMBER_CREATION_FAILED;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    private final OauthProviders oauthProviders;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final JedisPool jedisPool;

    public LoginResponse login(final ProviderType providerType, final String code) {
        final OauthProvider oauthProvider = oauthProviders.mapping(providerType);
        final OauthUserInfo oauthUserInfo = oauthProvider.getUserInfo(code);
        final Member member = findOrCreateMember(oauthUserInfo.getSocialLoginId(), providerType);
        return getLoginResultResponse(member);
    }

    private LoginResponse getLoginResultResponse(final Member member) {
        if (member.getUniversity() == null) {
            return new LoginResponse(member.getId(), false, "", "");
        }
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(member.getId().toString());
        saveRefreshToken(member, memberTokens.getRefreshToken());

        return new LoginResponse(member.getId(), true, memberTokens.getAccessToken(), memberTokens.getRefreshToken());
    }

    private void saveRefreshToken(final Member member, final String refreshToken) {
        Jedis jedis = jedisPool.getResource();
        jedis.setex(String.format("refreshToken%s", member.getId()), 604800, refreshToken);
    }

    private Member findOrCreateMember(final String socialLoginId, ProviderType providerType) {
        return memberRepository.findByLoginId(socialLoginId)
                .orElseGet(() -> createMember(socialLoginId, providerType));
    }

    private Member createMember(final String socialLoginId, ProviderType providerType) {
        if (memberRepository.existsByLoginId(socialLoginId)) {
            throw new AuthException(MEMBER_CREATION_FAILED);
        }
        Member member = memberRepository.save(new Member(socialLoginId, providerType));
        log.debug("saved member = {}", member);
        return member;
    }
}