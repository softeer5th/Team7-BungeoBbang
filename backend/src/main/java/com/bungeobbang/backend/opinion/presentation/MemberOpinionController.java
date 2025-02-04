package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import com.bungeobbang.backend.auth.member.MemberOnly;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.service.MemberOpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/opinion")
public class MemberOpinionController {

    private final MemberOpinionService memberOpinionService;

    @GetMapping()
    @MemberOnly
    public ResponseEntity<OpinionStatisticsResponse> getOpinionStatistics(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(memberOpinionService.computeOpinionStatistics(accessor.id()));
    }

    @PostMapping()
    @MemberOnly
    public ResponseEntity<OpinionCreationResponse> suggestOpinion(
            @RequestBody @Valid final OpinionCreationRequest creationRequest,
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(memberOpinionService.createOpinion(creationRequest, accessor.id()));
    }

    @PatchMapping("/{roomId}/remind")
    @MemberOnly
    public ResponseEntity<Void> patchOpinionRemind(
            @PathVariable @Valid final Long roomId,
            @Auth final Accessor accessor) {
        memberOpinionService.remindOpinion(roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    @MemberOnly
    public ResponseEntity<List<MemberOpinionInfoResponse>> getMemberOpinionList(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(memberOpinionService.findMemberOpinionList(accessor.id()));
    }
}
