package com.bungeobbang.backend.badword.domain;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Document(collection = "bad_word")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BadWord {
    @Id
    private String id;
    private String word;
}
