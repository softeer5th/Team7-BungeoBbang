package com.bungeobbang.backend.agenda.service.strategies;

import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaRepository;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.bungeobbang.backend.agenda.status.AgendaStatusType.ACTIVE;

@Service
@RequiredArgsConstructor
public class ActiveAgendaFinder implements AgendaFinder {
    private final CustomAgendaRepository customAgendaRepository;

    @Override
    public List<AgendaResponse> findAllByStatus(Long universityId, LocalDate endDate, Long agendaId) {
        return customAgendaRepository.getActiveAgendas(universityId, endDate, agendaId);
    }

    @Override
    public AgendaStatusType getStatus() {
        return ACTIVE;
    }
}

