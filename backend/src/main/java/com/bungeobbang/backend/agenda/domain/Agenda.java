package com.bungeobbang.backend.agenda.domain;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.common.entity.BaseTimeEntity;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.university.domain.University;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Agenda extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Enumerated(STRING)
    private CategoryType categoryType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin admin;

    @Column(length = 20)
    private String title;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private boolean isEnd;

    @Column(name = "participant_count", nullable = false, columnDefinition = "int default 0")
    private int count;

    @Column
    private String firstChatId;

    @OneToMany(mappedBy = "agenda")
    private List<AgendaImage> images = new ArrayList<>();
    @OneToMany(mappedBy = "agenda", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AgendaMember> agendaMembers = new ArrayList<>();

    @Builder
    public Agenda(Long id, CategoryType categoryType, University university, Admin admin, String title, LocalDate startDate, LocalDate endDate, String content, boolean isEnd, int count, List<AgendaImage> images, String firstChatId) {
        this.id = id;
        this.categoryType = categoryType;
        this.university = university;
        this.admin = admin;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
        this.isEnd = isEnd;
        this.count = count;
        this.images = images;
        this.firstChatId = firstChatId;
    }

    public void end() {
        this.endDate = LocalDate.now();
        this.isEnd = true;
    }

    public void increaseParticipantCount(int num) {
        this.count += num;
    }

    public void setFirstChatId(String chatId) {
        this.firstChatId = chatId;
    }
}
