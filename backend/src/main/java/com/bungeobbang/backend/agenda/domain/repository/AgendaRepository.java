package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    boolean existsByIdAndEndDateBefore(Long id, LocalDate endDate);
    List<Agenda> findAllByUniversityId(Long universityId);
}
