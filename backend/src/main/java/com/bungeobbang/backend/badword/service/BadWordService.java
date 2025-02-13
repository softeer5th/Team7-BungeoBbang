package com.bungeobbang.backend.badword.service;

import com.bungeobbang.backend.badword.domain.BadWord;
import com.bungeobbang.backend.badword.domain.repository.BadWordRepository;
import com.bungeobbang.backend.common.exception.BadWordException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ahocorasick.trie.Trie;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.BADWORD_INCLUDED;

@Service
@RequiredArgsConstructor
@Slf4j
public class BadWordService {
    private final BadWordRepository badWordRepository;
    private Trie trie;

    @PostConstruct
    public void init() {
        // todo 현재 서버 실행 시 한번만 업데이트 추후에는??
        List<String> badWords = badWordRepository.findAll().stream().map(BadWord::getWord).toList();

        Trie.TrieBuilder builder = Trie.builder().ignoreCase();
        badWords.forEach(builder::addKeyword);

        trie = builder.build();
    }

    public void validate(String text) {
        if (!trie.parseText(text).isEmpty()) {
            throw new BadWordException(BADWORD_INCLUDED);
        }
    }

    public void validate(String... texts) {
        if (Arrays.stream(texts).anyMatch(text -> !trie.parseText(text).isEmpty())) {
            throw new BadWordException(BADWORD_INCLUDED);
        }
    }
}
