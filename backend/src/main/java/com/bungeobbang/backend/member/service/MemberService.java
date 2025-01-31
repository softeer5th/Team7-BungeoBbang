package com.bungeobbang.backend.member.service;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.infrastructure.JwtProvider;
import com.bungeobbang.backend.common.infrastructure.RedisClient;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.member.dto.request.MemberUniversityUpdateRequest;
import com.bungeobbang.backend.member.dto.response.MemberLoginResult;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import com.bungeobbang.backend.member.infrastructure.oauthprovider.OauthProvider;
import com.bungeobbang.backend.member.infrastructure.oauthprovider.OauthProviders;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;
import com.bungeobbang.backend.university.domain.University;
import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.bungeobbang.backend.common.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final OauthProviders oauthProviders;
    private final MemberRepository memberRepository;
    private final UniversityRepository universityRepository;
    private final JwtProvider jwtProvider;
    private final RedisClient redisClient;

    public MemberLoginResult login(final ProviderType providerType, final String code) {
        log.info("Login provider type: {}, code: {}", providerType, code);
        final OauthProvider oauthProvider = oauthProviders.mapping(providerType);
        final OauthUserInfo oauthUserInfo = oauthProvider.getUserInfo(code);
        final Member member = findOrCreateMember(oauthUserInfo.getSocialLoginId(), providerType);
        log.info("member: {}", member);
        return getLoginResultResponse(member);
    }

    @Transactional
    public void updateUniversityInfo(final MemberUniversityUpdateRequest request) {
        final Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new AuthException(INVALID_MEMBER));
        final University university = universityRepository.findById(request.universityId())
                .orElseThrow(() -> new AuthException(INVALID_UNIVERSITY));

        if (!request.email().split("@")[1].equals(university.getDomain())) {
            throw new AuthException(UNIVERSITY_DOMAIN_MISMATCH);
        }

        member.updateUniversity(university, request.email());
    }

    private MemberLoginResult getLoginResultResponse(final Member member) {
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(member.getId().toString());
        saveRefreshToken(member, memberTokens.refreshToken());
        return new MemberLoginResult(member.getId(),
                member.getUniversity() != null,
                memberTokens.accessToken(),
                memberTokens.refreshToken());
    }

    private void saveRefreshToken(final Member member, final String refreshToken) {
        redisClient.setex(String.format("refreshToken%s", member.getId()), 604800L, refreshToken);
        log.info("saved refreshToken = {}", redisClient.get(String.format("refreshToken%s", member.getId())));
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