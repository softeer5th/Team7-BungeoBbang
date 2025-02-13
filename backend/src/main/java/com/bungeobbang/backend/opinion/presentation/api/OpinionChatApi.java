package com.bungeobbang.backend.opinion.presentation.api;

import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionDetailResponse;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
                    GET /api/opinions/2/chat?chatId=67a04c4a6d8394488027b840
                    GET /api/opinions/2/chat?chatId=67a04c4a6d8394488027b840&scroll=UP
                    GET /api/opinions/2/chat?chatId=67a04c4a6d8394488027b840&scroll=DOWN
                    
                    ```
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅 조회 성공", content = @Content(schema = @Schema(implementation = OpinionChatResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping("/{opinionId}/chat")
    ResponseEntity<List<OpinionChatResponse>> getOpinionChat(
            @Parameter(description = "조회할 말해요 ID", example = "2")
            @PathVariable @Valid Long opinionId,

            @Parameter(description = "기준 chat ID. (필수, 첫 조회에는 채팅방 리스트 조회 때 받았던 lastChat의 chatId로 지정,\n" +
                    "이후 조회의 up에서는 해당 chat 이전 채팅 10개, down에서는 해당 chat 이후 채팅 10개 조회)", example = "67a04c4a6d8394488027b840")
            @RequestParam(required = true) ObjectId chatId,

            @Parameter(description = "스크롤 방향(선택 사항, 첫 채팅방 입장은 scroll 없이 요청.")
            @RequestParam(required = false) final ScrollType scroll,

            @Parameter(description = "사용자 인증 정보", hidden = true)
            @Auth Accessor accessor
    );

    @Operation(
            summary = "말해요 채팅방에 해당하는 대학 이름 조회",
            description = """
                    특정 말해요 채팅방(opinionId)의 대학 이름을 조회합니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "해당 말해요 대학교이름 조회 성공", content = @Content(schema = @Schema(implementation = OpinionDetailResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content)
    })
    @GetMapping("/{opinionId}")
    ResponseEntity<OpinionDetailResponse> getOpinionDetail(
            @Parameter(description = "조회할 말해요 ID", example = "2")
            @PathVariable @Valid Long opinionId,

            @Parameter(description = "사용자 인증 정보", hidden = true)
            @Auth Accessor accessor
    );
}