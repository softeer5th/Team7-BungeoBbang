package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MyAgendaResponse;
import com.bungeobbang.backend.agenda.presentation.api.AgendaApi;
import com.bungeobbang.backend.agenda.service.MemberAgendaChatService;
import com.bungeobbang.backend.agenda.service.MemberAgendaService;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.MemberOnly;
import com.bungeobbang.backend.common.type.ScrollType;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/student/agendas")
@RequiredArgsConstructor
public class AgendaController implements AgendaApi {
    private final MemberAgendaService memberAgendaService;
    private final MemberAgendaChatService memberAgendaChatService;

    @Override
    @PostMapping("/{agendaId}")
    @MemberOnly
    public ResponseEntity<Void> participateAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId) {
        memberAgendaService.participateAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping
    @MemberOnly
    public ResponseEntity<List<MemberAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId) {
        return ResponseEntity.ok(memberAgendaService.getAgendasByStatus(accessor.id(), status, endDate, agendaId));
    }

    @Override
    @GetMapping("/{agendaId}")
    @MemberOnly
    public ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Auth Accessor accessor,
            @PathVariable Long agendaId
    ) {
        return ResponseEntity.ok(memberAgendaService.getAgendaDetail(accessor.id(), agendaId));
    }

    @Override
    @GetMapping("/my")
    @MemberOnly
    public ResponseEntity<List<MyAgendaResponse>> getMyAgendas(
            @Auth Accessor accessor
    ) {
        return ResponseEntity.ok(memberAgendaService.getMyAgenda(accessor.id()));
    }

    @Override
    @DeleteMapping("/{agendaId}")
    @MemberOnly
    public ResponseEntity<Void> exitAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId
    ) {
        memberAgendaService.exitAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/{agendaId}/chat")
    @MemberOnly
    public ResponseEntity<List<AgendaChatResponse>> getChats(
            @Auth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestParam(required = false) ObjectId chatId,
            @RequestParam(required = false, name = "scroll") ScrollType scrollType
    ) {
        return ResponseEntity.ok(memberAgendaChatService.getChats(accessor.id(), agendaId, chatId, scrollType));
    }
}
