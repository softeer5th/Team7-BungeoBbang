package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {


    Optional<Opinion> findById(Long id);

    List<Opinion> findAllByCreatedAtBetweenAndUniversityId(LocalDateTime startDate, LocalDateTime endDate, Long universityId);

    List<Opinion> findAllByCategoryTypeInAndUniversityIdAndIsRemind(Set<CategoryType> categoryTypes, Long universityId, boolean isRemind);


    List<Opinion> findAllByMemberId(Long memberId);

    @Query("SELECT o.id FROM Opinion o WHERE o.member.id = :memberId")
    List<Long> findAllOpinionIdsByMemberId(@Param("memberId") Long memberId);

    List<Opinion> findAllByUniversityId(Long universityId);

    List<Opinion> findAllByUniversityIdAndIsRemind(Long universityId, boolean isRemind);

    Long countByCreatedAtBetweenAndUniversityId(LocalDateTime localDateTime, LocalDateTime now, Long id);

    @Query("SELECT o.id FROM Opinion o WHERE o.university.id = :id")
    List<Long> findAllOpinionIdsByUniversityId(@Param("id") Long id);
}
