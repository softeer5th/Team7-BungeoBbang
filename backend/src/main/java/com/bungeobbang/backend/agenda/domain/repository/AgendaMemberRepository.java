package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaMemberRepository extends JpaRepository<AgendaMember, Long> {
    void deleteByMemberIdAndAgendaId(Long memberId, Long agendaId);
}
