package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


/**
 * 말해요 채팅 내역 관련 비즈니스 로직을 처리하는 서비스 클래스.
 */
@Service
@RequiredArgsConstructor
public class OpinionService {

    /**
     * 가장 큰 ObjectId 값을 나타내는 상수.
     * MongoDB의 ObjectId는 시간순으로 정렬되므로, 초기에 가장 최신 데이터(ObjectId가 가장 큼)를 가져오기 위함.
     */
    private static final String MAX_OBJECT_ID = "ffffffffffffffffffffffff";

    private final OpinionChatRepository opinionChatRepository;

    /**
     * 특정 말해요(opinionId)의 채팅 내역을 조회하는 메서드.
     *
     * @param opinionId  조회할 말해요 채팅방의 ID
     * @param lastChatId 마지막으로 조회한 채팅의 ID (Cursor 방식). 없을 경우 최신 메시지부터 조회
     * @param accessor   현재 요청을 보낸 사용자의 인증 정보
     * @return OpinionChatResponse 리스트 (해당 채팅방의 메시지 목록)
     */
    public List<OpinionChatResponse> findOpinionChat(Long opinionId, ObjectId lastChatId, Accessor accessor) {
        if (lastChatId == null) lastChatId = new ObjectId(MAX_OBJECT_ID);
        List<OpinionChatResponse> opinionChatResponses = new java.util.ArrayList<>(opinionChatRepository.findByOpinionIdAndLastChatId(opinionId, lastChatId)
                .stream()
                .map(opinionChat -> OpinionChatResponse.of(opinionChat, accessor.id(), opinionId))
                .toList());
        Collections.reverse(opinionChatResponses);

        return opinionChatResponses;
    }
}
