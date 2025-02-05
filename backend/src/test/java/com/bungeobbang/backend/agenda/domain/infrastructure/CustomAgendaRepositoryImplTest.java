package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.common.config.QuerydslConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
@Sql(scripts = {"/data/common.sql", "/data/agenda.sql"})
@Import({QuerydslConfig.class, CustomAgendaRepositoryImpl.class})
class CustomAgendaRepositoryImplTest {
    @Autowired
    private CustomAgendaRepositoryImpl customAgendaRepository;

    @Test
    @DisplayName("진행 전인 안건을 조회한다.")
    void getUpcomingAgendas() {
        final List<AgendaResponse> upcomingAgendas = customAgendaRepository.getUpcomingAgendas(1L, null, null);

        assertThat(upcomingAgendas).hasSize(5);
    }

    @Test
    @DisplayName("진행 중인 안건을 조회한다.")
    void getActiveAgendas() {
        final List<AgendaResponse> activeAgendas = customAgendaRepository.getActiveAgendas(1L, null, null);

        assertThat(activeAgendas).hasSize(5);
    }

    @Test
    @DisplayName("완료된 안건을 조회한다.")
    void getClosedAgendas() {
        final List<AgendaResponse> closedAgendas = customAgendaRepository.getClosedAgendas(1L, null, null);

        assertThat(closedAgendas).hasSize(6);

    }

}