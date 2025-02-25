package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaChatResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AdminAgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCategoryResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.dto.response.admin.AgendaStatisticResponse;
import com.bungeobbang.backend.agenda.presentation.api.AdminAgendaApi;
import com.bungeobbang.backend.agenda.service.AdminAgendaChatService;
import com.bungeobbang.backend.agenda.service.AdminAgendaService;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.admin.AdminOnly;
import com.bungeobbang.backend.auth.common.Auth;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.type.ScrollType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/admin/agendas")
@RequiredArgsConstructor
public class AdminAgendaController implements AdminAgendaApi {
    private final AdminAgendaService adminAgendaService;
    private final AdminAgendaChatService adminAgendaChatService;

    @Override
    @GetMapping
    @AdminOnly
    public ResponseEntity<List<AdminAgendaResponse>> getAgendasByStatus(
            @Auth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId) {
        return ResponseEntity.ok(adminAgendaService.getAgendasByStatus(accessor.id(), status, endDate, agendaId));
    }

    @Override
    @GetMapping("/{agendaId}")
    @AdminOnly
    public ResponseEntity<AgendaDetailResponse> getAgendaDetail(
            @Auth Accessor accessor,
            @PathVariable Long agendaId) {
        return ResponseEntity.ok(adminAgendaService.getAgendaDetail(accessor.id(), agendaId));
    }

    @Override
    @PostMapping
    @AdminOnly
    public ResponseEntity<AgendaCreationResponse> createAgenda(
            @Auth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request) {
        return ResponseEntity.ok(adminAgendaService.createAgenda(accessor.id(), request));
    }

    @Override
    @PatchMapping("/{agendaId}/close")
    @AdminOnly
    public ResponseEntity<Void> endAgenda(@Auth Accessor accessor,
                                          @PathVariable Long agendaId) {
        adminAgendaService.endAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @DeleteMapping("/{agendaId}")
    @AdminOnly
    public ResponseEntity<Void> deleteAgenda(@Auth Accessor accessor,
                                             @PathVariable Long agendaId) {
        adminAgendaService.deleteAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/{agendaId}")
    @AdminOnly
    public ResponseEntity<Void> editAgenda(@Auth Accessor accessor,
                                           @PathVariable Long agendaId,
                                           @RequestBody @Valid AgendaEditRequest request) {
        adminAgendaService.editAgenda(accessor.id(), agendaId, request);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/{agendaId}/chat")
    @AdminOnly
    public ResponseEntity<List<AgendaChatResponse>> getAgendaChat(
            @Auth Accessor accessor,
            @PathVariable Long agendaId,
            @RequestParam(required = false) ObjectId chatId,
            @RequestParam(required = false, name = "scroll") ScrollType scrollType) {
        return ResponseEntity.ok(adminAgendaChatService.getChats(accessor.id(), agendaId, chatId, scrollType));
    }

    @AdminOnly
    @Override
    public ResponseEntity<AgendaStatisticResponse> getAgendaByMonth(
            @Auth Accessor accessor,
            @RequestParam int year,
            @RequestParam int month) {
        final AgendaStatisticResponse response = adminAgendaService.getAgendaStatisticsByMonth(accessor.id(), year, month);
        return ResponseEntity.ok(response);
    }

    @AdminOnly
    @Override
    public ResponseEntity<List<AgendaCategoryResponse>> getAgendaByCategory(
            @Auth Accessor accessor,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(adminAgendaService.getAgendaCountByCategory(accessor.id(), year, month));
    }

    @AdminOnly
    @Override
    public ResponseEntity<AgendaStatisticResponse> getAgendaByYear(
            @Auth Accessor accessor,
            int year) {
        return ResponseEntity.ok(adminAgendaService.getAgendaStatisticsByYear(accessor.id(), year));
    }

    @AdminOnly
    @Override
    public ResponseEntity<List<AgendaCategoryResponse>> getAgendaByCategory(
            @Auth Accessor accessor,
            int year) {
        return ResponseEntity.ok(adminAgendaService.getAgendaCountByCategory(accessor.id(), year));
    }

}
