package com.bungeobbang.backend.opinion.fixture;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionType;

import static com.bungeobbang.backend.member.fixture.MemberFixture.KAKAO_MEMBER;
import static com.bungeobbang.backend.member.fixture.MemberFixture.NAVER_MEMBER;
import static com.bungeobbang.backend.university.UniversityFixture.KAKAO_UNIVERSITY;
import static com.bungeobbang.backend.university.UniversityFixture.NAVER_UNIVERSITY;

public class OpinionFixture {
    public static Opinion NAVER_OPINION1 = Opinion.builder()
            .id(1L)
            .university(NAVER_UNIVERSITY)
            .opinionType(OpinionType.NEED)
            .categoryType(CategoryType.IT)
            .member(NAVER_MEMBER)
            .isRemind(false)
            .build();

    public static Opinion NAVER_OPINION2 = Opinion.builder()
            .id(2L)
            .university(NAVER_UNIVERSITY)
            .opinionType(OpinionType.NEED)
            .categoryType(CategoryType.EVENTS)
            .member(NAVER_MEMBER)
            .isRemind(false)
            .build();

    public static Opinion KAKAO_OPINION1 = Opinion.builder()
            .id(3L)
            .university(KAKAO_UNIVERSITY)
            .opinionType(OpinionType.IMPROVEMENT)
            .categoryType(CategoryType.EVENTS)
            .member(KAKAO_MEMBER)
            .isRemind(false)
            .build();
}
