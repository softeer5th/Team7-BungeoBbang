package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.repository.AgendaImageRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.type.CategoryType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.bungeobbang.backend.admin.fixture.AdminFixture.KAKAO_ADMIN;
import static com.bungeobbang.backend.admin.fixture.AdminFixture.NAVER_ADMIN;
import static com.bungeobbang.backend.agenda.fixture.AgendaFixture.NAVER_AGENDA;
import static com.bungeobbang.backend.common.exception.ErrorCode.FORBIDDEN_UNIVERSITY_ACCESS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminAgendaServiceTest {
    @InjectMocks
    private AdminAgendaService adminAgendaService;
    @Mock
    private AgendaRepository agendaRepository;
    @Mock
    private AgendaImageRepository agendaImageRepository;
    @Mock
    private AdminRepository adminRepository;


    @Test
    @DisplayName("자신이 속하지 않은 대학의 답해요를 조회하면 에러가 발생한다.")
    void getAgendaDetail_mismatchUniversity() {
        Agenda agenda = NAVER_AGENDA;
        Admin admin = KAKAO_ADMIN;
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));
        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));

        // when & then
        assertThatThrownBy(() -> adminAgendaService.getAgendaDetail(KAKAO_ADMIN.getId(), NAVER_AGENDA.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("새로운 답해요를 생성한다.")
    void createAgenda() {
        Agenda agenda = NAVER_AGENDA;
        AgendaCreationRequest request = new AgendaCreationRequest(
                NAVER_AGENDA.getTitle(),
                NAVER_AGENDA.getCategoryType(),
                NAVER_AGENDA.getStartDate(),
                NAVER_AGENDA.getEndDate(),
                NAVER_AGENDA.getContent(),
                NAVER_AGENDA.getImages().stream().map(AgendaImage::getName).toList()
        );
        Admin admin = KAKAO_ADMIN;
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));
        when(agendaRepository.save(any()))
                .thenReturn(agenda);

        adminAgendaService.createAgenda(admin.getId(), request);

        verify(agendaRepository).save(Mockito.any());
        verify(agendaImageRepository).saveAll(Mockito.any());
    }

    @Test
    @DisplayName("학생회는 다른 대학의 답해요를 종료시킬 수 없다.")
    void endAgenda_universityAccess_fail() {
        Admin admin = KAKAO_ADMIN;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));

        assertThatThrownBy(() -> adminAgendaService.endAgenda(admin.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("학생회가 특정 답해요를 종료한다.")
    void endAgenda() {
        Admin admin = NAVER_ADMIN;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));

        adminAgendaService.endAgenda(admin.getId(), agenda.getId());

        assertThat(agenda.isEnd()).isTrue();
        assertThat(agenda.getEndDate()).isEqualTo(LocalDate.now());
    }

    @Test
    @DisplayName("학생회는 다른 대학의 답해요를 삭제할 수 없다.")
    void deleteAgenda_universityAccess_fail() {
        Admin admin = KAKAO_ADMIN;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));
        assertThatThrownBy(() -> adminAgendaService.deleteAgenda(admin.getId(), agenda.getId()))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());
    }

    @Test
    @DisplayName("답해요를 삭제한다.")
    void deleteAgenda() {
        Admin admin = NAVER_ADMIN;
        Agenda agenda = NAVER_AGENDA;
        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));
        adminAgendaService.deleteAgenda(admin.getId(), agenda.getId());

        verify(agendaRepository).deleteById(NAVER_AGENDA.getId());

    }

    @Test
    @DisplayName("학생회는 다른 대학의 답해요를 수정할 수 없다.")
    void editAgenda_universityAccess_fail() {
        Admin admin = KAKAO_ADMIN;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));

        assertThatThrownBy(() -> adminAgendaService.editAgenda(admin.getId(), agenda.getId(), new AgendaEditRequest("title", CategoryType.ACADEMICS, "content", List.of("images"))))
                .isInstanceOf(AgendaException.class)
                .hasMessage(FORBIDDEN_UNIVERSITY_ACCESS.getMessage());

    }

    @Test
    @DisplayName("답해요를 수정한다.")
    void editAgenda() {
        Admin admin = NAVER_ADMIN;
        Agenda agenda = NAVER_AGENDA;

        when(agendaRepository.findById(anyLong()))
                .thenReturn(Optional.of(agenda));
        when(adminRepository.findById(anyLong()))
                .thenReturn(Optional.of(admin));
        adminAgendaService.editAgenda(admin.getId(), agenda.getId(), new AgendaEditRequest("title", CategoryType.ACADEMICS, "content", List.of("images")));

        verify(agendaRepository).save(any(Agenda.class));
    }


}