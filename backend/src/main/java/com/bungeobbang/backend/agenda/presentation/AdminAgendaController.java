package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponses;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AdminAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.presentation.api.AdminAgendaApi;
import com.bungeobbang.backend.agenda.service.AdminAgendaChatService;
import com.bungeobbang.backend.agenda.service.AdminAgendaService;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class AdminAgendaController implements AdminAgendaApi {
    private final AdminAgendaService adminAgendaService;
    private final AdminAgendaChatService adminAgendaChatService;

    @Override
    @AdminOnly
    @GetMapping
    public ResponseEntity<List<AdminAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId) {
        return ResponseEntity.ok(adminAgendaService.getAgendasByStatus(accessor.id(), status, endDate, agendaId));
    }

    @Override
    @AdminOnly
    @GetMapping("/{agendaId}")
    public ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Auth Accessor accessor,
            @PathVariable Long agendaId) {
        return ResponseEntity.ok(adminAgendaService.getAgendaDetail(accessor.id(), agendaId));
    }

    @Override
    @AdminOnly
    @PostMapping
    public ResponseEntity<AgendaCreationResponse> createAgenda(
            @Auth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request) {
        return ResponseEntity.ok(adminAgendaService.createAgenda(accessor.id(), request));
    }

    @Override
    @AdminOnly
    @PatchMapping("/{agendaId}/close")
    public ResponseEntity<Void> endAgenda(@Auth Accessor accessor,
                                          @PathVariable Long agendaId) {
        adminAgendaService.endAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @AdminOnly
    @DeleteMapping("/{agendaId}")
    public ResponseEntity<Void> deleteAgenda(@Auth Accessor accessor,
                                             @PathVariable Long agendaId) {
        adminAgendaService.deleteAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @AdminOnly
    @PatchMapping("/{agendaId}")
    public ResponseEntity<Void> editAgenda(@Auth Accessor accessor,
                                           @PathVariable Long agendaId,
                                           @RequestBody @Valid AgendaEditRequest request) {
        adminAgendaService.editAgenda(accessor.id(), agendaId, request);
        return ResponseEntity.noContent().build();
    }

    @Override
    @AdminOnly
    @GetMapping("/{agendaId}/chat")
    public ResponseEntity<AgendaChatResponses> getAgendaChat(
            @Auth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestParam(required = false) ObjectId chatId) {
        return ResponseEntity.ok(adminAgendaChatService.getChats(accessor.id(), agendaId, chatId));
    }
}
