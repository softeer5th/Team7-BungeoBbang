package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpinionLastReadRepository extends MongoRepository<OpinionLastRead, String> {

    // ✅ 여러 개의 opinionId를 한 번에 조회하는 쿼리
    List<OpinionLastRead> findByOpinionIdInAndIsAdmin(List<Long> opinionIds, boolean isAdmin);

}
