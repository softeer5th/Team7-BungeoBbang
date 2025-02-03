package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionInfoListResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.service.OpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/opinion")
public class MemberOpinionController {

    private final OpinionService opinionService;

    @GetMapping()
    public ResponseEntity<OpinionStatisticsResponse> getOpinionStatistics(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.computeOpinionStatistics(accessor.id()));
    }

    @PostMapping()
    public ResponseEntity<OpinionCreationResponse> suggestOpinion(
            @RequestBody @Valid final OpinionCreationRequest creationRequest,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.createOpinion(creationRequest, accessor.id()));
    }

    @PatchMapping("/{roomId}/remind")
    public ResponseEntity<Void> patchOpinionRemind(
            @PathVariable @Valid final Long roomId) {
        opinionService.remindOpinion(roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<MemberOpinionInfoListResponse> getMemberOpinionList(
            @RequestParam(defaultValue = "#{T(java.lang.Long).MAX_VALUE}") final Long cursor,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.findMemberOpinionList(cursor, accessor.id()));
    }
}
