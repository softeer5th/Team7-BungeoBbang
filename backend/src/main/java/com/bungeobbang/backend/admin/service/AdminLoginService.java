package com.bungeobbang.backend.admin.service;

import com.bungeobbang.backend.admin.config.PasswordEncoder;
import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.admin.dto.request.AdminLoginRequest;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.infrastructure.JwtProvider;
import com.bungeobbang.backend.member.domain.repository.RefreshTokenRepository;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminLoginService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public MemberTokens login(final AdminLoginRequest adminLoginRequest) {
        final Admin admin = adminRepository.findByLoginId(adminLoginRequest.loginId())
                .orElseThrow(() -> new AuthException(ErrorCode.INVALID_ADMIN));

        if (!passwordEncoder.matches(adminLoginRequest.password(), admin.getPassword())) {
            throw new AuthException(ErrorCode.PASSWORD_MISMATCH);
        }

        MemberTokens memberTokens = jwtProvider.generateLoginToken(admin.getId().toString());
        refreshTokenRepository.saveRefreshToken(String.valueOf(admin.getId()), memberTokens.refreshToken());

        return memberTokens;
    }

}
