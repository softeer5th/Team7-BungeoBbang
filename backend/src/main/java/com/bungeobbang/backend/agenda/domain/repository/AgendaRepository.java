package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.Agenda;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Agenda a WHERE a.id = :agendaId")
    Optional<Agenda> findByIdWithLock(@Param("agendaId") Long id);

    boolean existsByIdAndEndDateBefore(Long id, LocalDate endDate);

    @Query("""
            select a from Agenda a
                where a.university.id = :universityId
                and a.startDate <= current_date
                and a.endDate > current_date
            """)
    List<Agenda> findActiveAgendasByUniversityId(Long universityId);

    @Query("""
            SELECT a FROM Agenda a
                      JOIN a. agendaMembers am
                      WHERE a.startDate <= CURRENT_DATE
                      and a.endDate > CURRENT_DATE
                      AND am.member.id = :memberId
            """)
        // 특정 memberId에 대한 필터링
    List<Agenda> findActiveAgendasByMemberId(@Param("memberId") Long memberId);
}
