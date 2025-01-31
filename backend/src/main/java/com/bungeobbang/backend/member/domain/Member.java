package com.bungeobbang.backend.member.domain;

import com.bungeobbang.backend.common.entity.BaseTimeEntity;
import com.bungeobbang.backend.university.domain.University;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @Column(unique = true, updatable = false)
    private String loginId;

    @Column
    private String email;

    @Column
    @Enumerated(value = EnumType.STRING)
    private ProviderType provider;

    public Member(String loginId, ProviderType provider) {
        this.university = null;
        this.email = null;
        this.loginId = loginId;
        this.provider = provider;
    }

    public void updateUniversity(University university, String email) {
        this.university = university;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format("id = %s, loginId = %s, email = %s, provider = %s", id, loginId, email, provider);
    }
}
