package com.bungeobbang.backend.agenda.presentation.api;

import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponses;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MyAgendaResponse;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "학생 답해요 관련 API", description = "학생이 답해요에 참여하는 API")
@RequestMapping("/student/agendas")
public interface AgendaApi {

    @Operation(summary = "답해요 참여", description = "학생이 특정 답해요에 참여합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "참여 성공"),
            @ApiResponse(responseCode = "400", description = "중복 요청"),
            @ApiResponse(responseCode = "401, 403", description = "인증 필요"),
            @ApiResponse(responseCode = "404", description = "답해요 없음")
    })
    @PostMapping("/{agendaId}")
    ResponseEntity<Void> participateAgenda(
            @Auth Accessor accessor,
            @Parameter(description = "참여할 답해요의 ID") @PathVariable Long agendaId
    );

    @Operation(summary = "답해요 상태별 조회", description = "특정 상태의 답해요 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공",
                    content = @Content(schema = @Schema(implementation = MemberAgendaResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증 필요", content = @Content),
    })
    @GetMapping
    ResponseEntity<List<MemberAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @Parameter(description = "조회할 답해요 상태") @RequestParam AgendaStatusType status,
            @Parameter(description = "마지막 조회된 답해요 마감일 (선택)") @RequestParam(required = false) LocalDate endDate,
            @Parameter(description = "마지막 조회된 답해요 ID (선택)") @RequestParam(required = false) Long agendaId
    );

    @Operation(
            summary = "답해요 상세 조회",
            description = "특정 agendaId에 대한 상세 정보를 조회합니다."
    )
    @GetMapping("/{agendaId}")
    ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Parameter(hidden = true) @Auth Accessor accessor,
            @Parameter(description = "조회할 아젠다 ID", example = "123")
            @PathVariable Long agendaId
    );

    @Operation(summary = "내가 참여한 답해요 리스트 조회(카카오톡 채팅방)", description = "사용자가 참여 중인 답해요 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공", content = @Content(schema = @Schema(implementation = MyAgendaResponse.class))),
            @ApiResponse(responseCode = "401", description = "인증 필요", content = @Content),
    })
    @GetMapping("/my")
    ResponseEntity<List<MyAgendaResponse>> getMyAgendas(@Auth Accessor accessor);

    @Operation(summary = "답해요 나가기", description = "학생이 특정 답해요에서 나갑니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "탈퇴 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "401", description = "인증 필요"),
            @ApiResponse(responseCode = "404", description = "답해요 없음")
    })
    @DeleteMapping("/{agendaId}")
    ResponseEntity<Void> exitAgenda(
            @Auth Accessor accessor,
            @Parameter(description = "탈퇴할 답해요의 ID") @PathVariable Long agendaId
    );

    @Operation(
            summary = "특정 답해요 채팅 조회",
            description = "특정 agendaId에 대한 채팅 목록을 조회합니다. 선택적으로 chatId를 제공하면 해당 chatId 이전의 메시지만 조회할 수 있습니다."
    )
    @GetMapping("/{agendaId}/chat")
    ResponseEntity<AgendaChatResponses> getChats(
            @Parameter(hidden = true) @Auth Accessor accessor,
            @Parameter(description = "조회할 답해요 ID", example = "123") @PathVariable Long agendaId,
            @Parameter(description = "특정 채팅 이후의 메시지를 가져오기 위한 chat ID", example = "65afc39b2d1e7c7a1f5b9123")
            @RequestParam(required = false) ObjectId chatId
    );
}
