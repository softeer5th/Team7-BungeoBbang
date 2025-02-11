package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MyAgendaResponse;
import com.bungeobbang.backend.agenda.presentation.api.AgendaApi;
import com.bungeobbang.backend.agenda.service.AgendaChatService;
import com.bungeobbang.backend.agenda.service.AgendaService;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
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
    private final AgendaService agendaService;
    private final AgendaChatService agendaChatService;

    @Override
    @PostMapping("/{agendaId}")
    public ResponseEntity<Void> participateAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId) {
        agendaService.participateAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping
    public ResponseEntity<List<MemberAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId) {
        return ResponseEntity.ok(agendaService.getAgendasByStatus(accessor.id(), status, endDate, agendaId));
    }

    @Override
    @GetMapping("/{agendaId}")
    public ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Auth Accessor accessor,
            @PathVariable Long agendaId
    ) {
        return ResponseEntity.ok(agendaService.getAgendaDetail(accessor.id(), agendaId));
    }

    @Override
    @GetMapping("/my")
    public ResponseEntity<List<MyAgendaResponse>> getMyAgendas(
            @Auth Accessor accessor
    ) {
        return ResponseEntity.ok(agendaService.getMyAgenda(accessor.id()));
    }

    @Override
    @DeleteMapping("/{agendaId}")
    public ResponseEntity<Void> exitAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId
    ) {
        agendaService.exitAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/{agendaId}/chat")
    public ResponseEntity<List<AgendaChatResponse>> getChats(
            @Auth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestParam(required = false) ObjectId chatId
    ) {
        return ResponseEntity.ok(agendaChatService.getChats(accessor.id(), agendaId, chatId));
    }
}
