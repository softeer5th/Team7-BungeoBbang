package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionInfoResponse;
import com.bungeobbang.backend.opinion.service.AdminOpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/opinions")
public class AdminOpinionController {

    private final AdminOpinionService adminOpinionService;

    @GetMapping()
    @AdminOnly
    public ResponseEntity<List<AdminOpinionInfoResponse>> getAdminOpinionList(
            final @AdminAuth Accessor accessor,
            @RequestParam(required = false) Set<CategoryType> categoryTypes) {
        return ResponseEntity.ok()
                .body(adminOpinionService.findAdminOpinionList(categoryTypes));
    }
}
