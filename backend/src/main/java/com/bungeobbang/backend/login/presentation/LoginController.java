package com.bungeobbang.backend.login.presentation;

import com.bungeobbang.backend.login.dto.response.LoginResponse;
import com.bungeobbang.backend.login.service.LoginService;
import com.bungeobbang.backend.member.domain.ProviderType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/student/auth/{provider}/login")
    public ResponseEntity<LoginResponse> login(
            @PathVariable final String provider,
            @RequestParam final String code
            ) {
        final ProviderType providerType = ProviderType.fromString(provider);
        final LoginResponse loginResponse = loginService.login(providerType, code);
        return ResponseEntity.ok(loginResponse);
    }
}
