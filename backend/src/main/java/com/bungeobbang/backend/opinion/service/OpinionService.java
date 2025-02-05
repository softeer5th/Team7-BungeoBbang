package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpinionService {

    private static final String MAX_OBJECT_ID = "ffffffffffffffffffffffff";

    private final OpinionChatRepository opinionChatRepository;

    public List<OpinionChatResponse> findOpinionChat(Long opinionId, ObjectId lastChatId, Accessor accessor) {
        if (lastChatId == null) lastChatId = new ObjectId(MAX_OBJECT_ID);
        return opinionChatRepository.findByOpinionIdAndLastChatId(opinionId, lastChatId)
                .stream()
                .map(opinionChat -> OpinionChatResponse.of(opinionChat, accessor.id(), opinionId))
                .toList();
    }
}
