package com.bungeobbang.backend.university;

import com.bungeobbang.backend.university.domain.University;

public class UniversityFixture {
    public static University NAVER_UNIVERSITY = new University(
            1L,
            "네이버대학교",
            "naver.com");

    public static University KAKAO_UNIVERSITY = new University(
            2L,
            "카카오대학교",
            "kakao.com"
    );

}
