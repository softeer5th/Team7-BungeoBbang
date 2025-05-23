package com.bungeobbang.backend.opinion.domain;

import com.bungeobbang.backend.common.entity.BaseTimeEntity;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.university.domain.University;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private Long chatCount;

    @Builder
    public Opinion(Long id, University university, OpinionType opinionType, CategoryType categoryType, Member member, boolean isRemind, Long chatCount) {
        this.id = id;
        this.university = university;
        this.opinionType = opinionType;
        this.categoryType = categoryType;
        this.member = member;
        this.isRemind = isRemind;
        this.chatCount = chatCount;
    }

    public void setRemind() {
        this.isRemind = true;
    }

    public void unsetRemind() {
        this.isRemind = false;
    }

    public void plusOneChatCount() {
        this.chatCount++;
    }

    public void resetChatCount() {
        this.chatCount = 0L;
    }
}
