package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.presentation.api.OpinionChatApi;
import com.bungeobbang.backend.opinion.service.OpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OpinionChatController implements OpinionChatApi {

    private final OpinionService opinionService;

    @GetMapping("/{opinionId}")
    public ResponseEntity<List<OpinionChatResponse>> getOpinionChat(
            @PathVariable @Valid final Long opinionId,
            @RequestParam(required = false) final LocalDateTime endDateTime,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok().body(opinionService.findOpinionChat(
                opinionId, endDateTime, accessor
        ));
    }
}
