package com.bungeobbang.backend.member.fixture;

import com.bungeobbang.backend.member.domain.Member;

import static com.bungeobbang.backend.member.domain.ProviderType.GOOGLE;
import static com.bungeobbang.backend.university.UniversityFixture.KAKAO_UNIVERSITY;
import static com.bungeobbang.backend.university.UniversityFixture.NAVER_UNIVERSITY;

public class MemberFixture {
    public static Member NAVER_MEMBER = Member.builder()
            .id(1L)
            .email("member@naver.com")
            .loginId("loginId")
            .provider(GOOGLE)
            .university(NAVER_UNIVERSITY)
            .build();

    public static Member KAKAO_MEMBER = Member.builder()
            .id(1L)
            .email("member@kakao.com")
            .loginId("loginId")
            .provider(GOOGLE)
            .university(KAKAO_UNIVERSITY)
            .build();
}
