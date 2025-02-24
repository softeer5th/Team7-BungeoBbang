package com.bungeobbang.backend.admin.presentation;


import com.bungeobbang.backend.admin.dto.request.AdminLoginRequest;
import com.bungeobbang.backend.admin.dto.response.AdminLoginResponse;
import com.bungeobbang.backend.admin.dto.response.AdminLoginResult;
import com.bungeobbang.backend.admin.service.AdminLoginService;
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
    public ResponseEntity<AdminLoginResponse> login(
            @RequestBody @Valid final AdminLoginRequest adminLoginRequest
    ) {
        final AdminLoginResult response = adminLoginService.login(adminLoginRequest);
        return ResponseEntity.
                status(CREATED)
                .header(ACCESS_TOKEN, response.memberTokens().accessToken())
                .header(REFRESH_TOKEN, response.memberTokens().refreshToken())
                .body(response.adminIdResponse());
    }
}