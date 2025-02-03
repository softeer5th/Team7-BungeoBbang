package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgendaService {
    private final AgendaMemberRepository agendaMemberRepository;
    private final AgendaRepository agendaRepository;
    private final MemberRepository memberRepository;

    public void participateAgenda(Long memberId, Long agendaId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));

        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(ErrorCode.INVALID_AGENDA));

        if (!agenda.getUniversity().equals(member.getUniversity())) {
            throw new AgendaException(ErrorCode.FORBIDDEN_UNIVERSITY_ACCESS);
        }

        agendaMemberRepository.save(AgendaMember.builder()
                .agenda(agenda)
                .member(member)
                .build()
        );
    }
}
