package com.bungeobbang.backend.agenda.presentation;

import com.bungeobbang.backend.agenda.service.AgendaService;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.auth.member.Auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student/agenda")
@RequiredArgsConstructor
public class AgendaController {
    private final AgendaService agendaService;

    @PostMapping("/{agendaId}")
    public ResponseEntity<Void> participateAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId) {
        agendaService.participateAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{agendaId}")
    public ResponseEntity<Void> exitAgenda(
            @Auth Accessor accessor,
            @PathVariable Long agendaId
    ) {
        agendaService.exitAgenda(accessor.id(), agendaId);
        return ResponseEntity.noContent().build();
    }

}
