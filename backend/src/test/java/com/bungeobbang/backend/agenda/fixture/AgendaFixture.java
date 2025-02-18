package com.bungeobbang.backend.agenda.fixture;

import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;

import java.time.LocalDate;
import java.util.List;

import static com.bungeobbang.backend.admin.fixture.AdminFixture.NAVER_ADMIN;
import static com.bungeobbang.backend.common.type.CategoryType.ACADEMICS;
import static com.bungeobbang.backend.university.UniversityFixture.NAVER_UNIVERSITY;

public class AgendaFixture {
    public static Agenda NAVER_AGENDA = Agenda.builder()
            .id(1L)
            .admin(NAVER_ADMIN)
            .title("Naver")
            .content("Naver")
            .university(NAVER_UNIVERSITY)
            .isEnd(false)
            .startDate(LocalDate.now())
            .endDate(LocalDate.now().plusDays(5))
            .categoryType(ACADEMICS)
            .images(List.of(new AgendaImage(1L, null, "image1")))
            .build();

    public static Agenda NAVER_AGENDA_2 = Agenda.builder()
            .id(2L)
            .admin(NAVER_ADMIN)
            .title("Naver")
            .content("Naver")
            .university(NAVER_UNIVERSITY)
            .isEnd(false)
            .startDate(LocalDate.now())
            .endDate(LocalDate.now().plusDays(5))
            .categoryType(ACADEMICS)
            .images(List.of(new AgendaImage(1L, null, "image1")))
            .build();
    public static Agenda END_AGENDA = Agenda.builder()
            .id(3L)
            .admin(NAVER_ADMIN)
            .title("Naver")
            .content("Naver")
            .university(NAVER_UNIVERSITY)
            .isEnd(false)
            .startDate(LocalDate.now().minusDays(10))
            .endDate(LocalDate.now().minusDays(5))
            .categoryType(ACADEMICS)
            .images(List.of(new AgendaImage(1L, null, "image1")))
            .build();
    public static Agenda UPCOMING_AGENDA = Agenda.builder()
            .id(4L)
            .admin(NAVER_ADMIN)
            .title("Naver")
            .content("Naver")
            .university(NAVER_UNIVERSITY)
            .isEnd(false)
            .startDate(LocalDate.now().plusDays(10))
            .endDate(LocalDate.now().plusDays(5))
            .categoryType(ACADEMICS)
            .images(List.of(new AgendaImage(1L, null, "image1")))
            .build();
    public static Agenda ACTIVE_AGENDA = Agenda.builder()
            .id(4L)
            .admin(NAVER_ADMIN)
            .title("Naver")
            .content("Naver")
            .university(NAVER_UNIVERSITY)
            .isEnd(false)
            .startDate(LocalDate.now().minusDays(10))
            .endDate(LocalDate.now().plusDays(5))
            .categoryType(ACADEMICS)
            .images(List.of(new AgendaImage(1L, null, "image1")))
            .build();
}
