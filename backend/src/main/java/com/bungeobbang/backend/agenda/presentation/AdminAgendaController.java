package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.agenda.service.AdminAgendaService;
import com.bungeobbang.backend.auth.admin.AdminAuth;
import com.bungeobbang.backend.auth.domain.Accessor;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/agenda")
@RequiredArgsConstructor
public class AdminAgendaController {
    private final AdminAgendaService adminAgendaService;

    @PostMapping
    public ResponseEntity<AgendaCreationResponse> createAgenda(
            @AdminAuth Accessor accessor,
            @RequestBody @Valid AgendaCreationRequest request) {
        System.out.println(accessor.authority());
        return ResponseEntity.ok(adminAgendaService.createAgenda(accessor.id(), request));
    }

}
