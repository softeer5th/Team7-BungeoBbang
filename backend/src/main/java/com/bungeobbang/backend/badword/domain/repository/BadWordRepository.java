package com.bungeobbang.backend.badword.domain.repository;

import com.bungeobbang.backend.badword.domain.BadWord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadWordRepository extends MongoRepository<BadWord, String> {
}
