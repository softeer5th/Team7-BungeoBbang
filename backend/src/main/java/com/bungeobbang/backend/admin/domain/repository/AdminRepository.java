package com.bungeobbang.backend.admin.domain.repository;

import com.bungeobbang.backend.admin.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByLoginId(String loginId);
}
