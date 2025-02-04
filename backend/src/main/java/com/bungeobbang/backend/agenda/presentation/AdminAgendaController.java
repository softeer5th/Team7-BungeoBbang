package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.presentation.api.AdminAgendaApi;
import com.bungeobbang.backend.agenda.service.AdminAgendaService;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.domain.Accessor;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class AdminAgendaController implements AdminAgendaApi {
    private final AdminAgendaService adminAgendaService;

    @Override
    public ResponseEntity<List<AgendaResponse>> getAgendasByStatus(
            @AdminAuth Accessor accessor,
            @RequestParam AgendaStatusType status,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Long agendaId) {
        return ResponseEntity.ok(adminAgendaService.getAgendasByStatus(accessor.id(), status, endDate, agendaId));
    }

    @Override
    public ResponseEntity<AgendaCreationResponse> createAgenda(
            @AdminAuth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request) {
        return ResponseEntity.ok(adminAgendaService.createAgenda(accessor.id(), request));
    }

    @Override
    public ResponseEntity<Void> endAgenda(@AdminAuth Accessor accessor,
                                          @PathVariable Long agendaId) {
        adminAgendaService.endAgenda(agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteAgenda(@AdminAuth Accessor accessor,
                                             @PathVariable Long agendaId) {
        adminAgendaService.deleteAgenda(agendaId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> editAgenda(@AdminAuth Accessor accessor,
                                           @PathVariable Long agendaId,
                                           @RequestBody AgendaEditRequest request) {
        adminAgendaService.editAgenda(agendaId, request);
        return ResponseEntity.noContent().build();
    }
}
