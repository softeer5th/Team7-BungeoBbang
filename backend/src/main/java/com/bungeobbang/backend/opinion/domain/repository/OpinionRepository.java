package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {

    @Query("SELECT COUNT(o) FROM Opinion o WHERE o.createdAt BETWEEN :startDate AND :endDate")
    Optional<Long> countOpinionsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
