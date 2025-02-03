package com.bungeobbang.backend.mail.service;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.mail.domain.repository.EmailVerificationCodeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EmailAuthServiceTest {
    @InjectMocks
    private EmailAuthService emailAuthService;
    @Mock
    private EmailVerificationCodeRepository emailVerificationCodeRepository;

    @Test
    @DisplayName("이메일 인증코드가 만료된 후 이메일 검증을 요청하면 에러가 발생한다.")
    void verifyCode_codeExpired() {
        // given
        Mockito.when(emailVerificationCodeRepository.findByEmail(Mockito.anyString()))
                .thenReturn(null);
        // when & then
        Assertions.assertThatThrownBy(() -> emailAuthService.verifyCode("email", "code"))
                .isInstanceOf(AuthException.class)
                .hasMessage(ErrorCode.EMAIL_CODE_EXPIRED.getMessage());
    }

    @Test
    @DisplayName("이메일 인증코드가 일치하지 않으면 에러가 발생한다")
    void verifyCode_codeMismatch() {
        // given
        String expected = "1234";
        Mockito.when(emailVerificationCodeRepository.findByEmail(Mockito.anyString()))
                .thenReturn(expected);
        Assertions.assertThatThrownBy(() -> emailAuthService.verifyCode("email", "5678"))
                .isInstanceOf(AuthException.class)
                .hasMessage(ErrorCode.CODE_MISMATCH.getMessage());
    }

    @Test
    @DisplayName("이메일 인증코드가 일치한다.")
    void verifyCode_success() {
        // given
        String expected = "1234";
        Mockito.when(emailVerificationCodeRepository.findByEmail(Mockito.anyString()))
                .thenReturn(expected);

        emailAuthService.verifyCode("email", "1234");
    }
}