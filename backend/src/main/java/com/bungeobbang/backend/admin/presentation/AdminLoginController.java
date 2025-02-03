package com.bungeobbang.backend.admin.presentation;


import com.bungeobbang.backend.admin.dto.request.AdminLoginRequest;
import com.bungeobbang.backend.admin.service.AdminLoginService;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/auth")
public class AdminLoginController {
    private static final String REFRESH_TOKEN = "refresh-token";
    private static final String ACCESS_TOKEN = "access-token";

    private final AdminLoginService adminLoginService;

    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestBody @Valid final AdminLoginRequest adminLoginRequest
    ) {
        final MemberTokens tokens = adminLoginService.login(adminLoginRequest);
        return ResponseEntity.
                status(CREATED)
                .header(ACCESS_TOKEN, tokens.accessToken())
                .header(REFRESH_TOKEN, tokens.refreshToken())
                .build();
    }
}