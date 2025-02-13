package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Sql(scripts = "/data/agenda_participate_test.sql")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AgendaServiceConcurrencyTest {

    @Autowired
    private AgendaService agendaService;

    @Autowired
    private AgendaRepository agendaRepository;


    @Test
    @DisplayName("10명이 동시에 참가하면 참여 수가 10개 증가한다.")
    void testConcurrentParticipation() throws InterruptedException {
        int threadCount = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 1; i <= threadCount; i++) {
            Long memberId = (long) i;
            executorService.execute(() -> {
                try {
                    agendaService.participateAgenda(memberId, 1L);
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();

        Agenda updatedAgenda = agendaRepository.findById(1L).orElseThrow();
        Assertions.assertThat(updatedAgenda.getCount()).isEqualTo(threadCount);
    }

    @Test
    @DisplayName("10명이 동시에 2번씩 참가하면 참여 수가 10개만 증가한다, 중복 참여가 불가능하다")
    void testConcurrentParticipation_doubleClick() throws InterruptedException {
        int threadCount = 10;
        Long agendaId = 1L;
        ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 1; i <= 10; i++) {
            Long memberId = (long) i;
            executorService.execute(() -> {
                try {
                    agendaService.participateAgenda(memberId, agendaId);
                    agendaService.participateAgenda(memberId, agendaId);
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();


        Agenda updatedAgenda = agendaRepository.findById(agendaId).orElseThrow();
        Assertions.assertThat(updatedAgenda.getCount()).isEqualTo(threadCount);
    }
}
