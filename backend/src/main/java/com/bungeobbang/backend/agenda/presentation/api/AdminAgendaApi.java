package com.bungeobbang.backend.agenda.presentation.api;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AdminAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCategoryResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaStatisticResponse;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.response.ErrorResponse;
import com.bungeobbang.backend.common.type.ScrollType;
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

import java.time.LocalDate;
import java.util.List;

@Tag(name = "학생회 답해요 관련 API", description = "학생회가 답해요 안건을 관리하는 API")
@RequestMapping("/admin/agendas")
public interface AdminAgendaApi {

    @Operation(
            summary = "안건 상태별 조회",
            description = "관리자가 특정 상태(진행 전, 진행 중, 완료)에 해당하는 안건 목록을 조회합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공적으로 안건 목록을 반환",
                    content = @Content(schema = @Schema(implementation = AgendaResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 파라미터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 요청", content = @Content),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생", content = @Content)
    })

    @GetMapping
    ResponseEntity<List<AdminAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId
    );

    @Operation(
            summary = "답해요 상세 조회",
            description = "특정 agendaId에 대한 상세 정보를 조회합니다."
    )
    @GetMapping("/{agendaId}")
    ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Parameter(hidden = true) @Auth Accessor accessor,
            @Parameter(description = "조회할 아젠다 ID", example = "123") Long agendaId);

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
            @Auth Accessor accessor,
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
            @Auth Accessor accessor,
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
            @Auth Accessor accessor,
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
            @Auth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestBody @Valid AgendaEditRequest request);


    @Operation(
            summary = "특정 답해요 채팅 조회",
            description = "관리자가 특정 답해요(agendaId)의 채팅 목록을 조회합니다. " +
                    "chatId를 전달하면 해당 채팅부터 이후의 메시지를 가져옵니다."
    )
    @GetMapping("/{agendaId}/chat")
    ResponseEntity<List<AgendaChatResponse>> getAgendaChat(
            @Parameter(description = "관리자 인증 정보", hidden = true)
            @Auth Accessor accessor,

            @Parameter(description = "조회할 답해요 ID", example = "123")
            @PathVariable Long agendaId,

            @Parameter(description = "마지막으로 본 채팅 ID (선택 사항, 없으면 최신 메시지부터 조회)", example = "65a3f8e2b93e4c23dc8e3a90")
            @RequestParam(required = false) ObjectId chatId,

            @RequestParam(required = false, name = "scroll") ScrollType scrollType
    );

    @Operation(summary = "답해요 월 통계")
    @GetMapping("/statistics/month")
    ResponseEntity<AgendaStatisticResponse> getAgendaByMonth(
            @RequestParam int year,
            @RequestParam int month
    );

    @Operation(summary = "답해요 월 카테고리 통계")
    @GetMapping("/statistics/month/category")
    ResponseEntity<List<AgendaCategoryResponse>> getAgendaByCategory(
            @RequestParam int year,
            @RequestParam int month
    );

    @Operation(summary = "답해요 월 통계")
    @GetMapping("/statistics/year")
    ResponseEntity<AgendaStatisticResponse> getAgendaByYear(
            @RequestParam int year
    );

    @Operation(summary = "답해요 월 카테고리 통계")
    @GetMapping("/statistics/year/category")
    ResponseEntity<List<AgendaCategoryResponse>> getAgendaByCategory(
            @RequestParam int year
    );
}
