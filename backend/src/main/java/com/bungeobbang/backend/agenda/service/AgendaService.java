package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinder;
import com.bungeobbang.backend.agenda.service.strategies.AgendaFinders;
import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendaService {
    private final AgendaMemberRepository agendaMemberRepository;
    private final AgendaRepository agendaRepository;
    private final MemberRepository memberRepository;
    private final AgendaFinders agendaFinders;

    public void participateAgenda(Long memberId, Long agendaId) {
        final Member member = getMember(memberId);

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

    public List<AgendaResponse> getAgendasByStatus(Long memberId, AgendaStatusType status, LocalDate endDate, Long agendaId) {
        final Member member = getMember(memberId);

        final AgendaFinder finder = agendaFinders.mapping(status);
        return finder.findAllByStatus(member.getUniversity().getId(), endDate, agendaId);
    }

    private Member getMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));
    }
}
