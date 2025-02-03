package com.bungeobbang.backend.opinion.domain;

import com.bungeobbang.backend.common.entity.BaseTimeEntity;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.university.domain.University;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Opinion extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @Enumerated(STRING)
    @Column(name = "opinion_type", nullable = false)
    private OpinionType opinionType;

    @Enumerated(STRING)
    @Column(name = "category_type", nullable = false)
    private CategoryType categoryType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "is_remind", nullable = false)
    private boolean isRemind;

    @Column(name = "chat_count", nullable = false)
    private int chatCount;

    public void editIsRemind(boolean isRemind) {
        this.isRemind = isRemind;
    }
}
