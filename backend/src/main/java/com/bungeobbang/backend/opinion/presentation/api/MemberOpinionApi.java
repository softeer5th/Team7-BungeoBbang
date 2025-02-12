package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.MemberOnly;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;

import java.util.List;

@Tag(name = "학생 말해요 관련 API")
@RequestMapping("/student/opinions")
public interface MemberOpinionApi {

    @Operation(
            summary = "최근 1달간 학생 말해요 통계 조회",
            description = """
                    학생이 1개월간 생성된 말해요의 통계를 조회합니다.
                    말해요_진입 페이지에 해당하는 api입니다.
                    - `opinionCount`: 최근 30일 학생의 의견 수
                    
                    - `responseRate`: 최근 30일 학생회의 답변률(%)
                    
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "통계 조회 성공", content = @Content(schema = @Schema(implementation = OpinionStatisticsResponse.class))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping
    @MemberOnly
    ResponseEntity<OpinionStatisticsResponse> getOpinionStatistics(
            @Parameter(hidden = true) @Auth Accessor accessor
    );

    @Operation(
            summary = "학생 말해요 제안",
            description = """
                    학생이 새로운 말해요를 제안(== 카테고리 고른 이후 첫 채팅 입력)합니다.
                    
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "제안 성공", content = @Content(schema = @Schema(implementation = OpinionCreationResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @PostMapping
    @MemberOnly
    ResponseEntity<OpinionCreationResponse> suggestOpinion(
            @RequestBody @Valid OpinionCreationRequest creationRequest,
            @Parameter(hidden = true) @Auth Accessor accessor
    );

    @Operation(
            summary = "학생 말해요 리마인드 요청",
            description = """
                    특정 말해요 채팅방을 리마인드 요청합니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리마인드 요청 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "403", description = "본인이 작성한 의견이 아닙니다.", content = @Content),
            @ApiResponse(responseCode = "404", description = "채팅방 조회 실패.", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @PatchMapping("/{opinionId}/remind")
    @MemberOnly
    ResponseEntity<Void> patchOpinionRemind(
            @Parameter(description = "리마인드 요청할 말해요 ID", example = "2")
            @PathVariable @Valid Long opinionId,
            @Parameter(hidden = true) @Auth Accessor accessor
    );

    @Operation(
            summary = "내가 만든 말해요 리스트 조회",
            description = """
                    학생이 본인이 생성한 말해요 리스트를 조회합니다.
                    "내 의견"의 말해요 탭에 해당하는 api입니다.
                   
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "내 말해요 리스트 조회 성공", content = @Content(schema = @Schema(implementation = MemberOpinionsInfoResponse.class))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping("/my")
    @MemberOnly
    ResponseEntity<List<MemberOpinionsInfoResponse>> getMemberOpinionList(
            @Parameter(hidden = true) @Auth Accessor accessor
    );

    @Operation(
            summary = "말해요 채팅방 삭제",
            description = """
                    학생 본인이 만든 말해요 채팅방을 삭제합니다.

                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅방 삭제 성공", content = @Content(schema = @Schema(implementation = MemberOpinionsInfoResponse.class))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "403", description = "본인이 작성한 의견이 아닙니다.", content = @Content),
            @ApiResponse(responseCode = "404", description = "채팅방 조회 실패.", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @DeleteExchange("/{opinionId}")
    @MemberOnly
    ResponseEntity<Void> deleteOpinion(
            @PathVariable @Valid final Long opinionId,
            @Parameter(hidden = true) @Auth Accessor accessor
    );
}
