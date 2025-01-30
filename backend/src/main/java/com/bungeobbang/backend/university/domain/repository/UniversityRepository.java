package com.bungeobbang.backend.university.domain.repository;

import com.bungeobbang.backend.university.domain.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
}
