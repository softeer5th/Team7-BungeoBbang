package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AgendaValidService {
    private final AgendaRepository agendaRepository;

    public void checkAgendaIsActive(Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));

        if (agenda.getStartDate().isAfter(LocalDate.now()))
            throw new AgendaException(ErrorCode.AGENDA_NOT_STARTED);

        if (agenda.getEndDate().isBefore(LocalDate.now()) || agenda.isEnd())
            throw new AgendaException(ErrorCode.AGENDA_CLOSED);
    }

    public boolean isAgendaStartsToday(Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));

        return agenda.getStartDate().isEqual(LocalDate.now());
    }
}
