package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {

    List<Opinion> findAllByCreatedAtBetweenAndUniversityId(LocalDateTime startDate, LocalDateTime endDate, Long universityId);

    List<Opinion> findAllByMemberId(Long memberId);
}
