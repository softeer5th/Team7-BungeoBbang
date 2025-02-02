package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.service.AdminAgendaService;
import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.domain.Accessor;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/agenda")
@RequiredArgsConstructor
public class AdminAgendaController {
    private final AdminAgendaService adminAgendaService;

    @PostMapping
    public ResponseEntity<AgendaCreationResponse> createAgenda(
            @AdminAuth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request) {
        return ResponseEntity.ok(adminAgendaService.createAgenda(accessor.id(), request));
    }

    @PatchMapping("/{agendaId}/end")
    public ResponseEntity<Void> endAgenda(@AdminAuth Accessor accessor,
                                          @PathVariable Long agendaId) {
        adminAgendaService.endAgenda(agendaId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{agendaId}")
    public ResponseEntity<Void> deleteAgenda(@AdminAuth Accessor accessor,
                                             @PathVariable Long agendaId) {
        adminAgendaService.deleteAgenda(agendaId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{agendaId}")
    public ResponseEntity<Void> editAgenda(@AdminAuth Accessor accessor,
                                           @PathVariable Long agendaId,
                                           @RequestBody AgendaEditRequest request) {
        adminAgendaService.editAgenda(agendaId, request);
        return ResponseEntity.noContent().build();
    }
}
