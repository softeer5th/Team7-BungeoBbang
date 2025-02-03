package com.bungeobbang.backend.agenda.presentation.api;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "학생회 답해요 관련 API", description = "학생회가 답해요 안건을 관리하는 API")
@RequestMapping("/admin/agenda")
public interface AdminAgendaApi {

    @Operation(
            summary = "답해요 안건 생성",
            description = "✅ **학생회 인증이 필요합니다.**<br>학생회가 새로운 답해요 안건을 생성합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "안건 생성 성공",
                    content = @Content(schema = @Schema(implementation = AgendaCreationResponse.class))),
            @ApiResponse(responseCode = "404", description = "해당 관리자 존재하지 않음", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "403", description = "학생회 권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    ResponseEntity<AgendaCreationResponse> createAgenda(
            @AdminAuth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request);

    @Operation(
            summary = "답해요 채팅방 종료",
            description = "✅ **학생회 인증이 필요합니다.**<br>학생회가 특정 답해요 채팅방을 종료합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "채팅방 종료 성공"),
            @ApiResponse(responseCode = "403", description = "학생회 권한 없음"),
            @ApiResponse(responseCode = "404", description = "채팅방을 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PatchMapping("/{agendaId}/close")
    ResponseEntity<Void> endAgenda(
            @AdminAuth Accessor accessor,
            @PathVariable Long agendaId);

    @Operation(
            summary = "답해요 채팅방 삭제",
            description = "✅ **학생회 인증이 필요합니다.**<br>학생회가 특정 답해요 채팅방을 삭제합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "채팅방 삭제 성공"),
            @ApiResponse(responseCode = "403", description = "학생회 권한 없음"),
            @ApiResponse(responseCode = "404", description = "채팅방을 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @DeleteMapping("/{agendaId}")
    ResponseEntity<Void> deleteAgenda(
            @AdminAuth Accessor accessor,
            @PathVariable Long agendaId);

    @Operation(
            summary = "답해요 채팅방 수정",
            description = "✅ **학생회 인증이 필요합니다.**<br>채팅방의 기간 외의 나머지 정보를 수정할 수 있습니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "채팅방 수정 성공"),
            @ApiResponse(responseCode = "403", description = "학생회 권한 없음"),
            @ApiResponse(responseCode = "404", description = "채팅방을 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PatchMapping("/{agendaId}")
    ResponseEntity<Void> editAgenda(
            @AdminAuth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestBody @Valid AgendaEditRequest request);
}
