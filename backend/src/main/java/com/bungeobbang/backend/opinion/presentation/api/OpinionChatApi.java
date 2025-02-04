package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "말해요 채팅 API", description = "말해요 채팅방의 채팅 내역을 관리하는 API")
@RequestMapping("/api/opinions")
public interface OpinionChatApi {

    @Operation(
            summary = "말해요 채팅 내역 조회",
            description = "특정 말해요 채팅방(opinionId)에 대한 채팅 내역을 조회합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅 조회 성공", content = @Content(schema = @Schema(implementation = OpinionChatResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{opinionId}")
    ResponseEntity<List<OpinionChatResponse>> getOpinionChat(
            @PathVariable @Valid Long opinionId,
            @RequestParam(required = false) ObjectId lastChatId,
            @Auth Accessor accessor
    );
}
