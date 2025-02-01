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
    @Column(name = "category_type", nullable = false)
    private CategoryType categoryType;

    @Enumerated(STRING)
    @Column(name = "opinion_type", nullable = false)
    private OpinionType opinionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "is_remind", nullable = false)
    private boolean isRemind;

    @Column(name = "chat_count", nullable = false)
    private int chatCount;

    public Opinion(University university, CategoryType categoryType, OpinionType opinionType, Member member, boolean isRemind, int chatCount) {
        this.university = university;
        this.categoryType = categoryType;
        this.opinionType = opinionType;
        this.member = member;
        this.isRemind = isRemind;
        this.chatCount = chatCount;
    }

    public void editIsRemind(boolean isRemind) {
        this.isRemind = isRemind;
    }
}
