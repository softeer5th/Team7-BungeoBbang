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
import org.springframework.transaction.annotation.Transactional;

/**
 * <h2>AgendaService</h2>
 * <p>답해요 관련 기능을 제공하는 서비스 클래스입니다.</p>
 * <p>사용자는 특정 답해요 참여하거나, 참여 중인 답해요에서 나갈 수 있습니다.</p>
 *
 * @author [zoouniak]
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
public class AgendaService {

    private final AgendaMemberRepository agendaMemberRepository;
    private final AgendaRepository agendaRepository;
    private final MemberRepository memberRepository;

    /**
     * <h3>답해요 참여</h3>
     * <p>특정 사용자가 특정 답해요에 참여하도록 합니다.</p>
     *
     * <h4>기능 설명:</h4>
     * <ul>
     *   <li>사용자의 존재 여부 검증</li>
     *   <li>답해요의 존재 여부 검증</li>
     *   <li>사용자의 대학 정보와 답해요의 대학 정보 검증</li>
     *   <li>검증이 완료되면 답해요 참여 정보를 저장</li>
     * </ul>
     *
     * <h4>예외 발생:</h4>
     * <ul>
     *   <li>{@code MemberException} - 사용자가 존재하지 않는 경우</li>
     *   <li>{@code AgendaException} - 답해요가 존재하지 않는 경우</li>
     *   <li>{@code AgendaException} - 사용자의 대학 정보와 답해요의 대학 정보가 일치하지 않는 경우</li>
     * </ul>
     *
     * @param memberId 참여하려는 사용자 ID
     * @param agendaId 참여하려는 답해요 ID
     * @throws MemberException 사용자 정보가 존재하지 않을 때 발생
     * @throws AgendaException 답해요가 존재하지 않을 때 발생
     * @throws AgendaException 사용자의 대학 정보가 다를 때 발생
     */
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

    /**
     * <h3>답해요 탈퇴</h3>
     * <p>특정 사용자가 특정 답해요에서 탈퇴합니다.</p>
     *
     * <h4>기능 설명:</h4>
     * <ul>
     *   <li>사용자 ID와 답해요 ID를 기반으로 데이터 삭제</li>
     *   <li>트랜잭션이 적용되어 데이터 무결성을 보장</li>
     * </ul>
     *
     * @param memberId 탈퇴하려는 사용자 ID
     * @param agendaId 탈퇴하려는 답해요 ID
     */
    @Transactional
    public void exitAgenda(Long memberId, Long agendaId) {
        agendaMemberRepository.deleteByMemberIdAndAgendaId(memberId, agendaId);
    }
}

