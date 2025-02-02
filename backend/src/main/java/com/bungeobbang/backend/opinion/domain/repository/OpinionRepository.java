package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {

    List<Opinion> findAllByCreatedAtBetweenAndUniversityId(LocalDateTime startDate, LocalDateTime endDate, Long universityId);

    @Query("SELECT o FROM Opinion o WHERE o.member.id = :memberId AND o.id < :cursor ORDER BY o.id DESC LIMIT 9")
    List<Opinion> findRecentOpinionsByMemberIdAndCursor(@Param("memberId") Long memberId, @Param("cursor") Long cursor);
}
