package com.bungeobbang.backend.opinion.domain;

import com.bungeobbang.backend.common.entity.BaseTimeEntity;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.university.domain.University;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Opinion extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @Enumerated(STRING)
    private CategoryType categoryType;

    @Enumerated(STRING)
    private OpinionType opinionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private boolean isRemind;

    @Column(name = "chat_count", nullable = false)
    private int chatCount;

}
