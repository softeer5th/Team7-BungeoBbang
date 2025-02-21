package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.common.exception.AgendaException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.bungeobbang.backend.agenda.fixture.AgendaFixture.*;
import static com.bungeobbang.backend.common.exception.ErrorCode.AGENDA_CLOSED;
import static com.bungeobbang.backend.common.exception.ErrorCode.AGENDA_NOT_STARTED;

@ExtendWith(MockitoExtension.class)
class AgendaValidServiceTest {
    @InjectMocks
    private AgendaValidService agendaValidService;
    @Mock
    private AgendaRepository agendaRepository;

    @Test
    @DisplayName("종료된 답해요는 에러를 발생한다.")
    void checkAgendaIsActive_ClosedAgenda() {
        // given
        Mockito.when(agendaRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(END_AGENDA));

        // when
        Assertions.assertThatThrownBy(() -> agendaValidService.checkAgendaIsActive(END_AGENDA.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(AGENDA_CLOSED.getMessage());
    }

    @Test
    @DisplayName("시작하지 않은 답해요는 에러를 발생한다.")
    void checkAgendaIsActive_UpcomingAgenda() {
        // given
        Mockito.when(agendaRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(UPCOMING_AGENDA));

        // when
        Assertions.assertThatThrownBy(() -> agendaValidService.checkAgendaIsActive(UPCOMING_AGENDA.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(AGENDA_NOT_STARTED.getMessage());
    }

    @Test
    @DisplayName("진행 중인 답해요는 검증을 통과한다.")
    void checkAgendaIsActive() {
        Mockito.when(agendaRepository.findById(Mockito.anyLong()))
                .thenReturn(Optional.of(ACTIVE_AGENDA));

        // when
        agendaValidService.checkAgendaIsActive(ACTIVE_AGENDA.getId());
    }
}