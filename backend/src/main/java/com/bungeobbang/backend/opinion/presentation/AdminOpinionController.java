package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionInfoListResponse;
import com.bungeobbang.backend.opinion.service.AdminOpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/opinion")
public class AdminOpinionController {

    private final AdminOpinionService adminOpinionService;

    @GetMapping()
    @AdminOnly
    public ResponseEntity<AdminOpinionInfoListResponse> getAdminOpinionList(
            final @AdminAuth Accessor accessor) {
        return ResponseEntity.ok()
                .body(adminOpinionService.findAdminOpinionList());
    }
}
