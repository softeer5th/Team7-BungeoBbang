package com.bungeobbang.backend.agenda.domain.repository;

import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaMemberRepository extends JpaRepository<AgendaMember, Long> {
    void deleteByMemberIdAndAgendaId(Long memberId, Long agendaId);

    List<AgendaMember> findAllByMember(Member member);
}
