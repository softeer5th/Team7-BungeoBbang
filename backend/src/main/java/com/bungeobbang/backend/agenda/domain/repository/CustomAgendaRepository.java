package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;

import java.time.LocalDate;
import java.util.List;

public interface CustomAgendaRepository {
    // 시작 전 답해요 조회
    List<AgendaResponse> getUpcomingAgendas(Long universityId, LocalDate endDate, Long agendaId);

    // 진행 중인 답해요 조회
    List<AgendaResponse> getActiveAgendas(Long universityId, LocalDate endDate, Long agendaId);

    // 완료된 답해요 조회
    List<AgendaResponse> getClosedAgendas(Long universityId, LocalDate endDate, Long agendaId);
}
