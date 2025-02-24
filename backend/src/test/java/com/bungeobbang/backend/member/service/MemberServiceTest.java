package com.bungeobbang.backend.member.service;

import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.RefreshTokenRepository;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.member.dto.request.MemberUniversityUpdateRequest;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import com.bungeobbang.backend.member.fixture.MemberFixture;
import com.bungeobbang.backend.university.domain.University;
import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.bungeobbang.backend.common.exception.ErrorCode.*;
import static com.bungeobbang.backend.member.domain.ProviderType.KAKAO;
import static com.bungeobbang.backend.university.UniversityFixture.KAKAO_UNIVERSITY;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
    @InjectMocks
    private MemberService memberService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private UniversityRepository universityRepository;
    @Mock
    private JwtProvider jwtProvider;
    @Mock
    private UuidRepository uuidRepository;
    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Test
    @DisplayName("데이터베이스에 저장되지 않은 사용자가 대학교 정보를 변경하면 에러가 발생한다.")
    void updateUniversityInfo_invalidMember() {
        // given
        when(memberRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.empty());
        MemberUniversityUpdateRequest request = new MemberUniversityUpdateRequest(1L, 1L, "test@test.ac.kr");
        // when & then
        assertThatThrownBy(() -> memberService.updateUniversityInfo(request))
                .isInstanceOf(AuthException.class)
                .hasMessage(INVALID_MEMBER.getMessage());
    }

    @Test
    @DisplayName("아직 등록되지 않은 대학교로 대학교 정보를 변경하면 에러가 발생한다.")
    void updateUniversityInfo_invalidUniversity() {
        // given
        Member member = new Member("loginId", KAKAO);
        MemberUniversityUpdateRequest request = new MemberUniversityUpdateRequest(1L, 1L, "test@test.ac.kr");
        when(memberRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(member));
        when(universityRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> memberService.updateUniversityInfo(request))
                .isInstanceOf(AuthException.class)
                .hasMessage(INVALID_UNIVERSITY.getMessage());
    }

    @Test
    @DisplayName("사용자가 대학 정보를 변경한다.")
    void updateUniversityInfo_validMember() {
        // given
        Member member = MemberFixture.NAVER_MEMBER;
        MemberUniversityUpdateRequest request = new MemberUniversityUpdateRequest(1L, 1L, "test@" + KAKAO_UNIVERSITY.getDomain());
        when(memberRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(member));
        when(universityRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(KAKAO_UNIVERSITY));
        when(jwtProvider.generateLoginToken(anyString(),
                any(Authority.class),
                anyString(),
                anyString())).thenReturn(new MemberTokens("accessToken", "refreshToken"));
        doNothing().when(uuidRepository).save(any(Authority.class), anyString(), anyString());
        memberService.updateUniversityInfo(request);

        Assertions.assertThat(member.getUniversity()).isEqualTo(KAKAO_UNIVERSITY);
    }

    @Test
    @DisplayName("이메일이 대학 도메인과 일치하지 않으면 에러가 발생한다.")
    void updateUniversityInfo_domainMismatch() {
        // given
        Member member = new Member("loginId", KAKAO);
        MemberUniversityUpdateRequest request = new MemberUniversityUpdateRequest(1L, 1L, "test@mismatch.ac.kr");
        when(memberRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(member));
        when(universityRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(new University(1L, "테스트 대학교", "test.ac.kr")));

        // when & then
        assertThatThrownBy(() -> memberService.updateUniversityInfo(request))
                .isInstanceOf(AuthException.class)
                .hasMessage(UNIVERSITY_DOMAIN_MISMATCH.getMessage());
    }
}