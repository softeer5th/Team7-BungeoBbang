package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaChatRepository;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.bungeobbang.backend.agenda.fixture.AgendaFixture.NAVER_AGENDA;
import static com.bungeobbang.backend.common.exception.ErrorCode.*;
import static com.bungeobbang.backend.member.fixture.MemberFixture.KAKAO_MEMBER;
import static com.bungeobbang.backend.member.fixture.MemberFixture.NAVER_MEMBER;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AgendaServiceTest {
    @InjectMocks
    private AgendaService agendaService;
    @Mock
    private AgendaMemberRepository agendaMemberRepository;
    @Mock
    private CustomAgendaChatRepository customAgendaChatRepository;
    @Mock
    private AgendaRepository agendaRepository;
    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("다른 대학의 답해요에 참가할 수 없다,")
    void participateAgendaWithMember_universityAccess_fail() {
        // given
        Member member = KAKAO_MEMBER;
        Agenda agenda = NAVER_AGENDA;
        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        // when & then
        assertThatThrownBy(() -> agendaService.participateAgenda(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("이미 참가한 답해요에 참여 요청을 보내면 에러가 발생한다.")
    void participateAgenda_duplicationRequest() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;
        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));
        when(agendaMemberRepository.existsByMemberIdAndAgendaId(anyLong(), anyLong()))
                .thenReturn(TRUE);

        // when & then
        assertThatThrownBy(() -> agendaService.participateAgenda(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(ALREADY_PARTICIPATED.getMessage());
    }

    @Test
    @DisplayName("답해요에 참가한다.")
    void participateAgenda() {
        //given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        // when
        agendaService.participateAgenda(member.getId(), agenda.getId());

        // then
        verify(agendaMemberRepository, Mockito.times(1)).save(any());
    }


    @Test
    @DisplayName("다른 대학교의 답해요를 조회할 수 없다.")
    void getAgendaDetail_universityAccess_fail() {
        // given
        Member member = KAKAO_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        // when & then
        assertThatThrownBy(() -> agendaService.getAgendaDetail(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("참여 내역이 없는 답해요에서 나가면 에러가 발생한다.")
    void exitAgenda_participationNotFound() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaMemberRepository.existsByMemberIdAndAgendaId(anyLong(), anyLong()))
                .thenReturn(FALSE);

        // when & then
        assertThatThrownBy(() -> agendaService.exitAgenda(agenda.getId(), member.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(AGENDA_PARTICIPATION_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("답해요 채팅방을 나간다.")
    void exitAgenda() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaMemberRepository.existsByMemberIdAndAgendaId(anyLong(), anyLong()))
                .thenReturn(TRUE);

        // when
        agendaService.exitAgenda(agenda.getId(), member.getId());

        // then
        verify(agendaMemberRepository, Mockito.times(1)).deleteByMemberIdAndAgendaId(member.getId(), agenda.getId());
    }

}