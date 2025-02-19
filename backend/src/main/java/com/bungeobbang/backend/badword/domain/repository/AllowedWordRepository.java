package com.bungeobbang.backend.badword.domain.repository;

import com.bungeobbang.backend.badword.domain.AllowedWord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AllowedWordRepository extends MongoRepository<AllowedWord, String> {
}
