package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.dto.MemberAgendaSubResult;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;

import java.time.LocalDate;
import java.util.List;

public interface CustomAgendaRepository {
    // 시작 전 답해요 조회
    List<AgendaResponse> getUpcomingAgendas(Long universityId, LocalDate endDate, Long agendaId);

    List<MemberAgendaSubResult> getUpcomingAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId);

    // 진행 중인 답해요 조회
    List<AgendaResponse> getActiveAgendas(Long universityId, LocalDate endDate, Long agendaId);

    List<MemberAgendaSubResult> getActiveAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId);

    // 완료된 답해요 조회
    List<AgendaResponse> getClosedAgendas(Long universityId, LocalDate endDate, Long agendaId);

    List<MemberAgendaSubResult> getClosedAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId);
}
