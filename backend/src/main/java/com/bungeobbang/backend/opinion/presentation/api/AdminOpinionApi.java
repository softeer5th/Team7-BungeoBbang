package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Tag(name = "학생회 말해요 관련 API")
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
                    GET /admin/opinions\n
                    GET /admin/opinions?categoryTypes=FACILITIES,BUDGET
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅방 리스트 조회 성공", content = @Content(schema = @Schema(implementation = OpinionChatResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    @AdminOnly
    ResponseEntity<List<AdminOpinionsInfoResponse>> getAdminOpinionList(
            @Parameter(description = "학생회 인증 정보", hidden = true)
            @AdminAuth Accessor accessor,

            @Parameter(description = "조회할 말해요 카테고리 목록 (선택 사항)", example = "[\"FACILITIES\", \"BUDGET\"]")
            @RequestParam(required = false) Set<CategoryType> categoryTypes
    );
}
