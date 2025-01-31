package com.bungeobbang.backend.member.presentation;

import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.dto.request.MemberUniversityUpdateRequest;
import com.bungeobbang.backend.member.dto.request.SocialLoginRequest;
import com.bungeobbang.backend.member.dto.response.MemberLoginResponse;
import com.bungeobbang.backend.member.dto.response.MemberLoginResult;
import com.bungeobbang.backend.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/university")
    public ResponseEntity<Void> updateUniversity(@RequestBody @Valid final MemberUniversityUpdateRequest request) {
        memberService.updateUniversityInfo(request);
        return ResponseEntity.ok().build();
    }
}
