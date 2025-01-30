package com.bungeobbang.backend.mail.presentation;

import com.bungeobbang.backend.mail.dto.request.EmailVerificationRequest;
import com.bungeobbang.backend.mail.dto.request.SendVerificationMailRequest;
import com.bungeobbang.backend.mail.service.EmailAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student/auth/email")
@RequiredArgsConstructor
public class EmailAuthController {
    private final EmailAuthService emailAuthService;

    @PostMapping()
    public ResponseEntity<Void> sendVerificationEmail(@RequestBody SendVerificationMailRequest request) {
        emailAuthService.sendVerificationEmail(request.email());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyEmailCode(@RequestBody EmailVerificationRequest request) {
        emailAuthService.verifyCode(request.email(), request.code());
        return ResponseEntity.ok().build();
    }
}
