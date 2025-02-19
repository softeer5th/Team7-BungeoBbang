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

    /**
     * 입력된 텍스트에서 금칙어를 검사하는 메서드.
     *
     * 1. 입력 텍스트를 소문자로 변환하여 일관된 비교를 수행.
     * 2. `badWordsTrie`를 통해 텍스트에서 금칙어 목록을 찾고, 해당 단어들의 등장 횟수를 저장.
     * 3. `allowedWordsTrie`를 통해 허용된 단어 목록을 찾고, 해당 단어들의 등장 횟수를 저장.
     * 4. 금칙어 목록을 순회하면서 아래 조건을 만족하는 경우 예외 발생:
     *    - 해당 금칙어가 `allowedWords`(허용된 단어 목록) 중 하나에 포함되지 않거나,
     *    - 포함된 경우라도 `badWord`의 개수가 `allowedWord`의 개수보다 많을 때.
     * 5. 조건을 만족하는 `badWord`를 발견하는 즉시 `BadWordException`을 발생시킴.
     *
     * @param text 검증할 텍스트
     * @throws BadWordException 금칙어가 포함된 경우 예외 발생
     */
    public void validate(String text) {
        text = text.toLowerCase();
        Map<String, Integer> badWords = badWordsTrie.searchBadWords(text);
        Map<String, Integer> allowedWords = allowedWordsTrie.searchBadWords(text);
        badWords.keySet().stream()
                .filter(badWord -> allowedWords.keySet().stream()
                        .filter(allowedWord -> allowedWord.contains(badWord))
                        .map(allowedWords::get)
                        .anyMatch(allowedWordCount -> badWords.get(badWord) > allowedWordCount))
                .findAny()
                .ifPresent(badWord -> { throw new BadWordException(BADWORD_INCLUDED, badWord); });
    }

    public void validate(String... texts) {
        Arrays.stream(texts).parallel().forEach(this::validate);
    }
}
