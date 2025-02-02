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
import java.util.Set;

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

    @OneToMany(mappedBy = "agenda")
    private Set<AgendaImage> imageList;

    @Builder
    public Agenda(int count, boolean isEnd, String content, LocalDate endDate, LocalDate startDate, String title, Admin admin, University university, CategoryType categoryType, Long id) {
        this.count = count;
        this.isEnd = isEnd;
        this.content = content;
        this.endDate = endDate;
        this.startDate = startDate;
        this.title = title;
        this.admin = admin;
        this.university = university;
        this.categoryType = categoryType;
        this.id = id;
    }
}
