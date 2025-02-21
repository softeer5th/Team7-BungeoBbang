package com.bungeobbang.backend.admin.service;

import com.bungeobbang.backend.admin.config.PasswordEncoder;
import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.admin.dto.request.AdminLoginRequest;
import com.bungeobbang.backend.admin.dto.response.AdminLoginResponse;
import com.bungeobbang.backend.admin.dto.response.AdminLoginResult;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.repository.RefreshTokenRepository;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.bungeobbang.backend.auth.domain.Authority.ADMIN;

@Service
@RequiredArgsConstructor
public class AdminLoginService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UuidRepository uuidRepository;

    public AdminLoginResult login(final AdminLoginRequest adminLoginRequest) {
        final Admin admin = adminRepository.findByLoginId(adminLoginRequest.loginId())
                .orElseThrow(() -> new AuthException(ErrorCode.INVALID_ADMIN));

        if (!passwordEncoder.matches(adminLoginRequest.password(), admin.getPassword())) {
            throw new AuthException(ErrorCode.PASSWORD_MISMATCH);
        }

        String uuid = UUID.randomUUID().toString();
        uuidRepository.save(ADMIN, uuid, String.valueOf(admin.getId()));

        MemberTokens memberTokens = jwtProvider.generateLoginToken(
                admin.getId().toString(),
                ADMIN,
                uuid,
                String.valueOf(admin.getUniversity().getId())
        );
        refreshTokenRepository.saveRefreshToken(ADMIN, String.valueOf(admin.getId()), memberTokens.refreshToken());

        return new AdminLoginResult(memberTokens, new AdminLoginResponse(admin.getId()));
    }

}
