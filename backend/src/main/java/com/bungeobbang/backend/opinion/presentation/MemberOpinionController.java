package com.bungeobbang.backend.opinion.presentation;

import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.MemberOnly;
import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.presentation.api.MemberOpinionApi;
import com.bungeobbang.backend.opinion.service.MemberOpinionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/opinions")
public class MemberOpinionController implements MemberOpinionApi {

    private final MemberOpinionService memberOpinionService;
    private final BadWordService badWordService;

    @MemberOnly
    @GetMapping()
    public ResponseEntity<OpinionStatisticsResponse> getOpinionStatistics(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(memberOpinionService.computeOpinionStatistics(accessor.id()));
    }

    @MemberOnly
    @PostMapping()
    public ResponseEntity<OpinionCreationResponse> suggestOpinion(
            @RequestBody @Valid final OpinionCreationRequest creationRequest,
            @Auth final Accessor accessor) {
        badWordService.validate(creationRequest.content());
        return ResponseEntity.ok()
                .body(memberOpinionService.createOpinion(creationRequest, accessor.id()));
    }

    @MemberOnly
    @DeleteMapping("/{opinionId}")
    public ResponseEntity<Void> deleteOpinion(
            @PathVariable @Valid final Long opinionId,
            @Auth final Accessor accessor) {
        memberOpinionService.deleteOpinion(opinionId, accessor.id());
        return ResponseEntity.ok().build();
    }

    @MemberOnly
    @PatchMapping("/{opinionId}/remind")
    public ResponseEntity<Void> patchOpinionRemind(
            @PathVariable @Valid final Long opinionId,
            @Auth final Accessor accessor) {
        memberOpinionService.remindOpinion(opinionId, accessor.id());
        return ResponseEntity.ok().build();
    }

    @MemberOnly
    @GetMapping("/my")
    public ResponseEntity<List<MemberOpinionsInfoResponse>> getMemberOpinionList(
            @Auth final Accessor accessor) {
        return ResponseEntity.ok()
                .body(memberOpinionService.findMemberOpinionList(accessor.id()));
    }
}
