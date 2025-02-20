package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {


    Optional<Opinion> findById(Long id);

    List<Opinion> findAllByCreatedAtBetweenAndUniversityId(LocalDateTime startDate, LocalDateTime endDate, Long universityId);

    List<Opinion> findAllByCategoryTypeInAndUniversityIdAndIsRemind(Set<CategoryType> categoryTypes, Long universityId, boolean isRemind);


    List<Opinion> findAllByMemberId(Long memberId);

    List<Opinion> findAllByUniversityId(Long universityId);

    List<Opinion> findAllByUniversityIdAndIsRemind(Long universityId, boolean isRemind);

    Long countByCreatedAtBetweenAndUniversityId(LocalDateTime localDateTime, LocalDateTime now, Long id);

}
