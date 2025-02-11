package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OpinionLastReadRepository extends MongoRepository<OpinionLastRead, String> {

    Optional<OpinionLastRead> findByOpinionIdAndIsAdmin(Long opinionId, boolean admin);

}
