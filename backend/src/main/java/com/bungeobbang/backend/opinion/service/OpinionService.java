package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpinionService {

    public static final String MIN_OBJECT_ID = "000000000000000000000000";
    private final OpinionChatRepository opinionChatRepository;


    public List<OpinionChatResponse> findOpinionChat(Long opinionId, ObjectId lastChatId, Accessor accessor) {
        if (lastChatId == null) lastChatId = new ObjectId(MIN_OBJECT_ID);

        return opinionChatRepository.findByOpinionIdAndLastChatId(opinionId, lastChatId)
                .stream()
                .map(opinionChat -> new OpinionChatResponse(
                        opinionChat.getId(),
                        accessor.id(),
                        opinionId,
                        opinionChat.getChat(),
                        opinionChat.isAdmin(),
                        opinionChat.getImages(),
                        LocalDateTime.ofInstant(
                                Instant.ofEpochSecond(opinionChat.getId().getTimestamp()),
                                ZoneId.of("Asia/Seoul") // 한국 시간으로 변환
                        )
                ))
                .toList();
    }
}
