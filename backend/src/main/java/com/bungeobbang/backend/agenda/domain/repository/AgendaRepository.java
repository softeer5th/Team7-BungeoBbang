package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    List<Agenda> findAllByUniversityId(Long universityId);
}
