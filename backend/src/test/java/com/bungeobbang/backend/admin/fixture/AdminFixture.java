package com.bungeobbang.backend.admin.fixture;

import com.bungeobbang.backend.admin.domain.Admin;

import static com.bungeobbang.backend.university.UniversityFixture.KAKAO_UNIVERSITY;
import static com.bungeobbang.backend.university.UniversityFixture.NAVER_UNIVERSITY;

public class AdminFixture {
    public static Admin NAVER_ADMIN = new Admin(
            1L,
            "loginId",
            "password",
            "네이버 학생회",
            NAVER_UNIVERSITY
    );

    public static Admin KAKAO_ADMIN = new Admin(
            2L,
            "loginId",
            "password",
            "카카오 학생회",
            KAKAO_UNIVERSITY
    );
}
