package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionDetailResponse;
import com.bungeobbang.backend.opinion.presentation.api.OpinionChatApi;
import com.bungeobbang.backend.opinion.service.OpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/opinions")
public class OpinionChatController implements OpinionChatApi {

    private final OpinionService opinionService;

    @GetMapping("/{opinionId}/chat")
    public ResponseEntity<List<OpinionChatResponse>> getOpinionChat(
            @PathVariable @Valid final Long opinionId,
            @RequestParam(required = true) @Valid final ObjectId chatId,
            @RequestParam(required = true) @Valid final ScrollType scroll,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok().body(opinionService.findOpinionChat(
                opinionId, chatId, accessor.id(), scroll
        ));
    }

    @GetMapping("/{opinionId}")
    public ResponseEntity<OpinionDetailResponse> getOpinionDetail(
            @PathVariable @Valid final Long opinionId,
            @Auth final Accessor accessor
    ) {
        return ResponseEntity.ok().body(opinionService.findOpinionDetail(opinionId));
    }
}
