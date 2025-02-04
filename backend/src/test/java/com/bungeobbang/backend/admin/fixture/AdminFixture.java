package com.bungeobbang.backend.admin.fixture;

import com.bungeobbang.backend.admin.domain.Admin;

import static com.bungeobbang.backend.university.UniversityFixture.UNIVERSITY;

public class AdminFixture {
    public static Admin ADMIN = new Admin(
            1L,
            "loginId",
            "password",
            "학생회",
            UNIVERSITY
    );
}
