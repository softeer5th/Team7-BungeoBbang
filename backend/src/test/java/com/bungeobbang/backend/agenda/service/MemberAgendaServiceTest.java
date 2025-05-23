package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaMember;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.MemberAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.AgendaLatestChat;
import com.bungeobbang.backend.agenda.dto.response.AgendaDetailResponse;
import com.bungeobbang.backend.agenda.dto.response.member.MyAgendaResponse;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.bungeobbang.backend.agenda.fixture.AgendaFixture.NAVER_AGENDA;
import static com.bungeobbang.backend.agenda.fixture.AgendaFixture.NAVER_AGENDA_2;
import static com.bungeobbang.backend.common.exception.ErrorCode.*;
import static com.bungeobbang.backend.member.fixture.MemberFixture.KAKAO_MEMBER;
import static com.bungeobbang.backend.member.fixture.MemberFixture.NAVER_MEMBER;
import static java.lang.Boolean.TRUE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MemberAgendaServiceTest {
    @InjectMocks
    private MemberAgendaService memberAgendaService;
    @Mock
    private AgendaMemberRepository agendaMemberRepository;
    @Mock
    private MemberAgendaChatRepository memberAgendaChatRepository;
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
        when(agendaRepository.findByIdWithLock(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        // when & then
        assertThatThrownBy(() -> memberAgendaService.participateAgenda(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("이미 참가한 답해요에 참여 요청을 보내면 에러가 발생한다.")
    void participateAgenda_duplicationRequest() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;
        when(agendaRepository.findByIdWithLock(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));
        when(agendaMemberRepository.existsByMemberIdAndAgendaIdAndIsDeletedFalse(anyLong(), anyLong()))
                .thenReturn(TRUE);

        // when & then
        assertThatThrownBy(() -> memberAgendaService.participateAgenda(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(ALREADY_PARTICIPATED.getMessage());
    }

    @Test
    @DisplayName("답해요에 참가한다.")
    void participateAgenda() {
        //given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findByIdWithLock(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        // when
        memberAgendaService.participateAgenda(member.getId(), agenda.getId());

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
        assertThatThrownBy(() -> memberAgendaService.getAgendaDetail(member.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("답해요를 조회한다.")
    void getAgendaDetail() {
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;
        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));

        AgendaDetailResponse expected = AgendaDetailResponse.from(agenda);

        // when
        final AgendaDetailResponse actual = memberAgendaService.getAgendaDetail(member.getId(), agenda.getId());

        // then
        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);

    }

    @Test
    @DisplayName("참여 내역이 없는 답해요에서 나가면 에러가 발생한다.")
    void exitAgenda_participationNotFound() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        when(agendaMemberRepository.findByMemberIdAndAgendaIdAndIsDeletedFalse(anyLong(), anyLong()))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> memberAgendaService.exitAgenda(agenda.getId(), member.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(AGENDA_PARTICIPATION_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("답해요 채팅방을 나간다.")
    void exitAgenda() {
        // given
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;

        final AgendaMember agendaMember = AgendaMember.builder().member(member).agenda(agenda).build();
        when(agendaMemberRepository.findByMemberIdAndAgendaIdAndIsDeletedFalse(anyLong(), anyLong()))
                .thenReturn(Optional.of(agendaMember));

        // when
        memberAgendaService.exitAgenda(agenda.getId(), member.getId());

        // then
        Assertions.assertThat(agendaMember.isDeleted()).isTrue();
    }

    @Test
    @DisplayName("내가 참가한 답해요 목록을 조회한다.")
    void getMyAgendas() {
        Member member = NAVER_MEMBER;
        Agenda agenda = NAVER_AGENDA;
        Agenda agenda2 = NAVER_AGENDA_2;
        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(member));
        when(agendaMemberRepository.findAllByMember(member))
                .thenReturn(List.of(new AgendaMember(1L, agenda, member), new AgendaMember(1L, agenda2, member)));
        when(memberAgendaChatRepository.findLastChats(List.of(1L, 2L), member.getId()))
                .thenReturn(
                        List.of(
                                new AgendaLatestChat(1L, new ObjectId(0, 0), "1번 마지막 채팅", LocalDateTime.now(), false, null),
                                new AgendaLatestChat(2L, new ObjectId(0, 0), null, LocalDateTime.now(), false, null)
                        ));
        // when
        final List<MyAgendaResponse> myAgenda = memberAgendaService.getMyAgenda(member.getId());
        // then
        assertThat(myAgenda).hasSize(2);

        final List<String> contents = myAgenda.stream()
                .map(response -> response.lastChat().content()).toList();
        assertThat(contents).containsExactly("1번 마지막 채팅", null);
    }

}