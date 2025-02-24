package com.bungeobbang.backend.member.presentation;

import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.dto.request.MemberUniversityUpdateRequest;
import com.bungeobbang.backend.member.dto.request.SocialLoginRequest;
import com.bungeobbang.backend.member.dto.response.AccessTokenResponse;
import com.bungeobbang.backend.member.dto.response.MemberLoginResponse;
import com.bungeobbang.backend.member.dto.response.MemberLoginResult;
import com.bungeobbang.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/student/auth")
@RequiredArgsConstructor
public class MemberController {
    private final static String ACCESS_TOKEN = "access-token";
    private final static String REFRESH_TOKEN = "refresh-token";
    private final MemberService memberService;

    @PostMapping("/{provider}/login")
    public ResponseEntity<MemberLoginResponse> login(
            @PathVariable final String provider,
            @RequestBody @Valid final SocialLoginRequest request
    ) {
        final ProviderType providerType = ProviderType.fromString(provider);
        final MemberLoginResult memberLoginResult = memberService.login(providerType, request.code());
        return ResponseEntity.ok()
                .header(ACCESS_TOKEN, memberLoginResult.accessToken())
                .header(REFRESH_TOKEN, memberLoginResult.refreshToken())
                .body(new MemberLoginResponse(memberLoginResult.memberId(), memberLoginResult.isEmailVerified()));
    }

    @Operation(summary = "로그인 연장")
    @PostMapping("/login/extend")
    public ResponseEntity<Void> extendLogin(
            @RequestHeader(name = REFRESH_TOKEN) final String refreshToken,
            @RequestHeader(name = AUTHORIZATION) final String authorizeHeader

    ) {
        AccessTokenResponse accessToken = memberService.extend(authorizeHeader, refreshToken);
        return ResponseEntity.status(CREATED)
                .header(ACCESS_TOKEN, accessToken.accessToken())
                .build();
    }

    @PatchMapping("/university")
    public ResponseEntity<MemberLoginResponse> updateUniversity(@RequestBody @Valid final MemberUniversityUpdateRequest request) {
        final MemberLoginResult memberLoginResult = memberService.updateUniversityInfo(request);

        return ResponseEntity.ok()
                .header(ACCESS_TOKEN, memberLoginResult.accessToken())
                .header(REFRESH_TOKEN, memberLoginResult.refreshToken())
                .body(new MemberLoginResponse(memberLoginResult.memberId(), memberLoginResult.isEmailVerified()));
    }
}
