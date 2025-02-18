package com.bungeobbang.backend.badword.service;

import com.bungeobbang.backend.badword.AhoCorasick;
import com.bungeobbang.backend.badword.domain.AllowedWord;
import com.bungeobbang.backend.badword.domain.BadWord;
import com.bungeobbang.backend.badword.domain.repository.AllowedWordRepository;
import com.bungeobbang.backend.badword.domain.repository.BadWordRepository;
import com.bungeobbang.backend.common.exception.BadWordException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.bungeobbang.backend.common.exception.ErrorCode.BADWORD_INCLUDED;

@Service
@RequiredArgsConstructor
@Slf4j
public class BadWordService {
    private final BadWordRepository badWordRepository;
    private final AllowedWordRepository allowedWordRepository;
    private AhoCorasick badWordsTrie;
    private AhoCorasick allowedWordsTrie;

    @PostConstruct
    public void init() {
        List<String> badWords = badWordRepository.findAll().stream()
                .map(BadWord::getWord)
                .toList();
        List<String> allowedWords = allowedWordRepository.findAll().stream()
                .map(AllowedWord::getWord)
                .toList();

        badWordsTrie = new AhoCorasick(badWords);
        allowedWordsTrie = new AhoCorasick(allowedWords);
    }

    public void validate(String text) {
        text = text.toLowerCase();
        Map<Integer, List<String>> detectedWords = badWordsTrie.searchBadWords(text);
        Map<Integer, List<String>> allowedWords = allowedWordsTrie.searchBadWords(text);
        if (detectedWords.size() > allowedWords.size()) throw new BadWordException(BADWORD_INCLUDED);
    }

    // todo : 수정
    public void validate(String... texts) {
        if (Arrays.stream(texts).anyMatch(text -> !badWordsTrie.searchBadWords(text).isEmpty())) {
            throw new BadWordException(BADWORD_INCLUDED);
        }
    }
}
