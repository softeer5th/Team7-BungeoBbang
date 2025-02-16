package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendaMemberRepository extends JpaRepository<AgendaMember, Long> {
    boolean existsByMemberIdAndAgendaIdAndIsDeletedFalse(Long memberId, Long agendaId);

    Optional<AgendaMember> findByMemberIdAndAgendaIdAndIsDeletedTrue(Long memberId, Long agendaId);

    Optional<AgendaMember> findByMemberIdAndAgendaIdAndIsDeletedFalse(Long memberId, Long agendaId);

    void deleteByMemberIdAndAgendaId(Long memberId, Long agendaId);

    @Query("SELECT am FROM AgendaMember am JOIN FETCH am.agenda WHERE am.member = :member")
    List<AgendaMember> findAllByMember(@Param("member") Member member);
}
