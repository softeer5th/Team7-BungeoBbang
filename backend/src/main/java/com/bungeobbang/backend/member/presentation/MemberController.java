package com.bungeobbang.backend.member.presentation;

import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.dto.response.MemberLoginResponse;
import com.bungeobbang.backend.member.dto.response.MemberLoginResult;
import com.bungeobbang.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/student/auth/{provider}/login")
    public ResponseEntity<MemberLoginResponse> login(
            @PathVariable final String provider,
            @RequestParam final String code
            ) {
        final ProviderType providerType = ProviderType.fromString(provider);
        final MemberLoginResult memberLoginResult = memberService.login(providerType, code);
        return ResponseEntity.ok()
                .header("Authorization", String.format("Bearer %s", memberLoginResult.accessToken()))
                .body(new MemberLoginResponse(memberLoginResult.memberId(), memberLoginResult.refreshToken()));
    }
}
