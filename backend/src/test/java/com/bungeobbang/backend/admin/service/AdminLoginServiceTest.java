package com.bungeobbang.backend.admin.service;

import com.bungeobbang.backend.admin.config.PasswordEncoder;
import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.admin.dto.request.AdminLoginRequest;
import com.bungeobbang.backend.admin.dto.response.AdminLoginResult;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.RefreshTokenRepository;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.bungeobbang.backend.admin.fixture.AdminFixture.NAVER_ADMIN;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminLoginServiceTest {
    @InjectMocks
    private AdminLoginService adminLoginService;
    @Mock
    private AdminRepository adminRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtProvider jwtProvider;
    @Mock
    private RefreshTokenRepository refreshTokenRepository;
    @Mock
    private UuidRepository uuidRepository;

    @Test
    @DisplayName("존재하지 않는 아이디로 로그인하면 에러가 발생한다")
    void login_invalid_loginId() {
        // given
        when(adminRepository.findByLoginId(Mockito.anyString())).thenReturn(Optional.empty());
        final AdminLoginRequest request = new AdminLoginRequest("invalid_login_id", "password");

        // when & then
        assertThatThrownBy(() -> adminLoginService.login(request))
                .isInstanceOf(AuthException.class)
                .hasMessage(ErrorCode.INVALID_ADMIN.getMessage());
    }

    @Test
    @DisplayName("비밀번호가 일치하지 않으면 에러가 발생한다.")
    void login_mismatch_password() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findByLoginId(Mockito.anyString()))
                .thenReturn(Optional.of(admin));
        final AdminLoginRequest request = new AdminLoginRequest("admin", "invalid_password");
        when(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(FALSE);

        // when & then
        assertThatThrownBy(() -> adminLoginService.login(request))
                .isInstanceOf(AuthException.class)
                .hasMessage(ErrorCode.PASSWORD_MISMATCH.getMessage());
    }

    @Test
    @DisplayName("로그인에 성공하면 어세스토큰과 리프레시 토큰을 발급한다.")
    void login_success() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findByLoginId(Mockito.anyString()))
                .thenReturn(Optional.of(admin));
        final AdminLoginRequest request = new AdminLoginRequest("admin", "invalid_password");
        when(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(TRUE);

        final MemberTokens expected = new MemberTokens("access_token", "refresh_token");
        when(jwtProvider.generateLoginToken(Mockito.anyString(), Mockito.any(Authority.class), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(expected);
        doNothing().when(refreshTokenRepository).saveRefreshToken(Mockito.any(Authority.class), Mockito.anyString(), Mockito.anyString());

        // when
        final AdminLoginResult actual = adminLoginService.login(request);

        // then
        Assertions.assertThat(actual.memberTokens()).isEqualTo(expected);
        Assertions.assertThat(actual.adminIdResponse().adminId()).isEqualTo(admin.getId());
    }
}