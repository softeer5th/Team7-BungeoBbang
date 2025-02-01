package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.Accessor;
import com.bungeobbang.backend.auth.Auth;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.service.OpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OpinionController {

    private final OpinionService opinionService;

    @PostMapping("/student/opinion")
    public ResponseEntity<OpinionCreationResponse> postOpinion(
            @RequestBody @Valid OpinionCreationRequest creationRequest,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.createOpinion(creationRequest, accessor));
    }
}
