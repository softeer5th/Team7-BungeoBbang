package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpinionService {

    private final OpinionChatRepository opinionChatRepository;

    public List<OpinionChatResponse> findOpinionChat(Long opinionId, LocalDateTime endDateTime, Accessor accessor) {
        if (endDateTime == null) endDateTime = LocalDateTime.now();

        return opinionChatRepository.findByOpinionIdAndCreatedAt(opinionId, endDateTime)
                .stream()
                .map(opinionChat -> new OpinionChatResponse(
                        opinionChat.getId(),
                        accessor.id(),
                        opinionId,
                        opinionChat.getChat(),
                        opinionChat.isAdmin(),
                        opinionChat.getImages(),
                        opinionChat.getCreatedAt()
                ))
                .toList();
    }
}
