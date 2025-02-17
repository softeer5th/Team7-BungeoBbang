package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.presentation.api.AdminOpinionApi;
import com.bungeobbang.backend.opinion.service.AdminOpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.time.YearMonth;
import java.util.List;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/opinions")
public class AdminOpinionController implements AdminOpinionApi {

    private final AdminOpinionService adminOpinionService;

    @AdminOnly
    @GetMapping()
    public ResponseEntity<List<AdminOpinionsInfoResponse>> getAdminOpinionList(
            final @Auth Accessor accessor,
            final @RequestParam(required = false) Set<CategoryType> categoryTypes) {
        return ResponseEntity.ok()
                .body(adminOpinionService.findAdminOpinionList(categoryTypes, accessor.id()));
    }

    @AdminOnly
    @GetMapping("/statistics/month")
    public ResponseEntity<AdminOpinionStatisticsResponse> getAdminOpinionStatistics(
            final @Auth Accessor accessor,
            final @RequestParam YearMonth yearMonth) {
        return ResponseEntity.ok()
                .body(adminOpinionService.computeMonthlyStatistics(yearMonth, accessor));
    }

    @AdminOnly
    @GetMapping("/statistics/year")
    public ResponseEntity<AdminOpinionStatisticsResponse> getAdminOpinionStatistics(
            final @Auth Accessor accessor,
            final @RequestParam Year year) {
        return ResponseEntity.ok()
                .body(adminOpinionService.computeYearlyStatistics(year, accessor));
    }
}
