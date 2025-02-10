package com.bungeobbang.backend.agenda.service.strategies;

import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaRepository;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.dto.response.MemberAgendaResponse;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.bungeobbang.backend.agenda.status.AgendaStatusType.UPCOMING;

@Service
@RequiredArgsConstructor
public class UpcomingAgendaFinder implements AgendaFinder {
    private final CustomAgendaRepository customAgendaRepository;

    @Override
    public List<AgendaResponse> findAllByStatus(Long universityId, LocalDate endDate, Long agendaId) {
        return customAgendaRepository.getUpcomingAgendas(universityId, endDate, agendaId);
    }

    @Override
    public List<MemberAgendaResponse> findAllByStatus(Long universityId, LocalDate endDate, Long agendaId, Long memberId) {
        return customAgendaRepository.getUpcomingAgendasWithParticipation(universityId, endDate, agendaId, memberId);
    }

    @Override
    public AgendaStatusType getStatus() {
        return UPCOMING;
    }
}

