package com.bungeobbang.backend.agenda.service.strategies;

import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;

import java.time.LocalDate;
import java.util.List;

public interface AgendaFinder {
    List<AgendaResponse> findAllByStatus(Long universityId, LocalDate endDate, Long agendaId);

    List<MemberAgendaResponse> findAllByStatus(Long universityId, LocalDate endDate, Long agendaId, Long memberId);

    AgendaStatusType getStatus();
}
