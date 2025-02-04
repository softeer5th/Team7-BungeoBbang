package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "학생&학생회 말해요 관련 API", description = "말해요 채팅방의 채팅 내역을 관리하는 API")
@RequestMapping("/api/opinions")
public interface OpinionChatApi {

    @Operation(
            summary = "말해요 채팅 내역 조회",
            description = """
                    특정 말해요 채팅방(opinionId)의 채팅 내역을 조회합니다. 
                    - `lastChatId`를 전달하면 해당 채팅 시점 이후의 메시지를 가져옵니다.
                    
                    **✅ 사용 예시**
                    ```
                    GET /api/opinions\n
                    GET /api/opinions?lastChatId=67a04c4a6d8394488027b840
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅 조회 성공", content = @Content(schema = @Schema(implementation = OpinionChatResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{opinionId}")
    ResponseEntity<List<OpinionChatResponse>> getOpinionChat(
            @Parameter(description = "조회할 말해요 ID", example = "2")
            @PathVariable @Valid Long opinionId,

            @Parameter(description = "마지막으로 본 채팅 ID (선택 사항, 없으면 최신 메시지부터 조회)", example = "67a04c4a6d8394488027b840")
            @RequestParam(required = false) ObjectId lastChatId,

            @Parameter(description = "사용자 인증 정보", hidden = true)
            @Auth Accessor accessor
    );
}