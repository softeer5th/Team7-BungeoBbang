package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.auth.member.MemberOnly;
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
    @MemberOnly
    public ResponseEntity<OpinionStatisticsResponse> getOpinionStatistics(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.computeOpinionStatistics(accessor.id()));
    }

    @PostMapping()
    @MemberOnly
    public ResponseEntity<OpinionCreationResponse> suggestOpinion(
            @RequestBody @Valid final OpinionCreationRequest creationRequest,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.createOpinion(creationRequest, accessor.id()));
    }

    @PatchMapping("/{roomId}/remind")
    @MemberOnly
    public ResponseEntity<Void> patchOpinionRemind(
            @PathVariable @Valid final Long roomId,
            @Auth final Accessor accessor) {
        opinionService.remindOpinion(roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    @MemberOnly
    public ResponseEntity<MemberOpinionInfoListResponse> getMemberOpinionList(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(opinionService.findMemberOpinionList(accessor.id()));
    }
}
