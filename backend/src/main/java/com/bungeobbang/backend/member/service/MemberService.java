package com.bungeobbang.backend.member.service;

import com.bungeobbang.backend.auth.BearerAuthorizationExtractor;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.repository.RefreshTokenRepository;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.member.dto.request.MemberUniversityUpdateRequest;
import com.bungeobbang.backend.member.dto.response.AccessTokenResponse;
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

import java.util.UUID;

import static com.bungeobbang.backend.auth.domain.Authority.MEMBER;
import static com.bungeobbang.backend.common.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final OauthProviders oauthProviders;

    private final MemberRepository memberRepository;
    private final UniversityRepository universityRepository;

    private final JwtProvider jwtProvider;
    private static final String EMAIL_DELIMITER = "@";
    private final UuidRepository uuidRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BearerAuthorizationExtractor bearerAuthorizationExtractor;

    public MemberLoginResult login(final ProviderType providerType, final String code) {
        final OauthProvider oauthProvider = oauthProviders.mapping(providerType);
        final OauthUserInfo oauthUserInfo = oauthProvider.getUserInfo(code);
        final Member member = findOrCreateMember(oauthUserInfo.getSocialLoginId(), providerType);

        Long memberId = member.getId();
        final String uuid = UUID.randomUUID().toString();
        // uuid 저장
        saveUuid(String.valueOf(memberId), uuid);

        // jwt 생성
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(
                memberId.toString(),
                MEMBER,
                uuid,
                String.valueOf(member.getUniversity().getId()));
        // refreshToken 저장
        saveRefreshToken(memberId, memberTokens.refreshToken());

        return new MemberLoginResult(
                memberId,
                member.getUniversity() != null,
                memberTokens.accessToken(),
                memberTokens.refreshToken()
        );
    }

    @Transactional
    public void updateUniversityInfo(final MemberUniversityUpdateRequest request) {
        final Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new AuthException(INVALID_MEMBER));
        final University university = universityRepository.findById(request.universityId())
                .orElseThrow(() -> new AuthException(INVALID_UNIVERSITY));

        if (!request.email().split(EMAIL_DELIMITER)[1].equals(university.getDomain())) {
            throw new AuthException(UNIVERSITY_DOMAIN_MISMATCH);
        }

        member.updateUniversity(university, request.email());
    }

    public AccessTokenResponse extend(String authorizeHeader, String refreshToken) {
        jwtProvider.validateToken(refreshToken);
        final String memberId = jwtProvider.getSubject(bearerAuthorizationExtractor.extractAccessToken(authorizeHeader));
        final String savedRefreshToken = refreshTokenRepository.getRefreshToken(MEMBER, memberId);
        validateRefreshToken(refreshToken, savedRefreshToken);

        String uuid = UUID.randomUUID().toString();

        saveUuid(memberId, uuid);

        return new AccessTokenResponse(jwtProvider.createAccessToken(memberId, MEMBER, uuid));
    }

    private void validateRefreshToken(String actual, String expected) {
        if (!actual.equals(expected)) {
            throw new AuthException(REFRESH_TOKEN_MISMATCH);
        }
    }

    private void saveUuid(final String memberId, final String uuid) {
        uuidRepository.save(MEMBER, uuid, memberId);
    }

    private void saveRefreshToken(final Long memberId, final String refreshToken) {
        refreshTokenRepository.saveRefreshToken(MEMBER, String.valueOf(memberId), refreshToken);
    }

    private Member findOrCreateMember(final String socialLoginId, final ProviderType providerType) {
        return memberRepository.findByLoginId(socialLoginId)
                .orElseGet(() -> createMember(socialLoginId, providerType));
    }

    private Member createMember(final String socialLoginId, final ProviderType providerType) {
        return memberRepository.save(new Member(socialLoginId, providerType));
    }
}