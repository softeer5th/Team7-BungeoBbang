package com.bungeobbang.backend.member.presentation;

import com.bungeobbang.backend.member.dto.response.MemberLoginResponse;
import com.bungeobbang.backend.member.service.MemberService;
import com.bungeobbang.backend.member.domain.ProviderType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        final MemberLoginResponse memberLoginResponse = memberService.login(providerType, code);
        return ResponseEntity.ok(memberLoginResponse);
    }
}
