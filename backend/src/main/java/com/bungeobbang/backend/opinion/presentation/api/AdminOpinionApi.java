package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Year;
import java.time.YearMonth;
import java.util.List;
import java.util.Set;

@Tag(name = "학생회 말해요 관련 API", description = "학생회가 말해요 의견 및 통계를 조회하는 API")
@RequestMapping("/admin/opinions")
public interface AdminOpinionApi {

    @Operation(
            summary = "학생회 말해요 목록 조회",
            description = """
                    학생회가 모든 말해요 채팅방 목록을 조회합니다.
                    - `categoryTypes`를 전달하면 해당 카테고리에 해당하는 말해요 채팅방만 필터링됩니다.
                    - 선택하지 않으면 전체 채팅방 목록을 반환합니다.
                    
                    **✅ 사용 예시**
                    ```
                    GET /admin/opinions
                    GET /admin/opinions?categoryTypes=FACILITIES,BUDGET
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅방 리스트 조회 성공", content = @Content(schema = @Schema(implementation = AdminOpinionsInfoResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping
    @AdminOnly
    ResponseEntity<List<AdminOpinionsInfoResponse>> getAdminOpinionList(
            @Parameter(description = "학생회 인증 정보", hidden = true)
            @Auth Accessor accessor,

            @Parameter(description = "조회할 말해요 카테고리 목록 (선택 사항)", example = "[\"FACILITIES\", \"BUDGET\"]")
            @RequestParam(required = false) Set<CategoryType> categoryTypes
    );

    @Operation(
            summary = "월별 학생회 말해요 통계 조회",
            description = """
                    학생회가 특정 월에 대한 말해요 의견 및 답변 통계를 조회합니다.
                    
                    **✅ 사용 예시**
                    ```
                    GET /admin/opinions/statistics/month?yearMonth=2024-12
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "월별 통계 조회 성공", content = @Content(schema = @Schema(implementation = AdminOpinionStatisticsResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping("/statistics/month")
    @AdminOnly
    ResponseEntity<AdminOpinionStatisticsResponse> getAdminOpinionStatistics(
            @Parameter(description = "학생회 인증 정보", hidden = true)
            @Auth Accessor accessor,

            @Parameter(description = "조회할 월 (YYYY-MM)", example = "2024-12")
            @RequestParam YearMonth yearMonth
    );

    @Operation(
            summary = "연도별 학생회 말해요 통계 조회",
            description = """
                    학생회가 특정 연도에 대한 말해요 의견 및 답변 통계를 조회합니다.
                    
                    **✅ 사용 예시**
                    ```
                    GET /admin/opinions/statistics/year?year=2024
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "연도별 통계 조회 성공", content = @Content(schema = @Schema(implementation = AdminOpinionStatisticsResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping("/statistics/year")
    @AdminOnly
    ResponseEntity<AdminOpinionStatisticsResponse> getAdminOpinionStatistics(
            @Parameter(description = "학생회 인증 정보", hidden = true)
            @Auth Accessor accessor,

            @Parameter(description = "조회할 연도 (YYYY)", example = "2024")
            @RequestParam Year year
    );
}
