package com.bungeobbang.backend.badword.service;

import com.bungeobbang.backend.badword.AhoCorasick;
import com.bungeobbang.backend.badword.domain.BadWord;
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
    private AhoCorasick ahoCorasick;

    @PostConstruct
    public void init() {
        List<String> badWords = badWordRepository.findAll().stream()
                .map(BadWord::getWord)
                .toList();

        ahoCorasick = new AhoCorasick(badWords);
    }

    public void validate(String text) {
        Map<Integer, List<String>> detectedWords = ahoCorasick.searchBadWords(text);
        if (!detectedWords.isEmpty()) throw new BadWordException(BADWORD_INCLUDED);
    }

    public void validate(String... texts) {
        if (Arrays.stream(texts).anyMatch(text -> !ahoCorasick.searchBadWords(text).isEmpty())) {
            throw new BadWordException(BADWORD_INCLUDED);
        }
    }
}
