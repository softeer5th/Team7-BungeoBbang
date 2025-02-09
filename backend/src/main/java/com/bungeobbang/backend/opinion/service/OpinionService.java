package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionDetailResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    private final OpinionLastReadRepository opinionLastReadRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final OpinionRepository opinionRepository;

    /**
     * 특정 말해요(opinionId)의 채팅 내역을 조회하는 메서드.
     *
     * @param opinionId  조회할 말해요 채팅방의 ID
     * @param lastChatId 마지막으로 조회한 채팅의 ID (Cursor 방식). 없을 경우 최신 메시지부터 조회
     * @param accessor   현재 요청을 보낸 사용자의 인증 정보
     * @return OpinionChatResponse 리스트 (해당 채팅방의 메시지 목록)
     */
    public List<OpinionChatResponse> findOpinionChat(final Long opinionId, ObjectId lastChatId, final Accessor accessor) {
        if (lastChatId == null) lastChatId = new ObjectId(MAX_OBJECT_ID);
        final List<OpinionChatResponse> opinionChatResponses = new java.util.ArrayList<>(opinionChatRepository.findByOpinionIdAndLastChatId(opinionId, lastChatId)
                .stream()
                .map(opinionChat -> OpinionChatResponse.of(opinionChat, accessor.id(), opinionId))
                .toList());
        Collections.reverse(opinionChatResponses);

        return opinionChatResponses;
    }

    public OpinionDetailResponse findOpinionDetail(final Long opinionId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        return new OpinionDetailResponse(opinion.getUniversity().getName(), opinion.isRemind());
    }

    public void updateLastReadToMax(final Long opinionId, final boolean isAdmin) {
        OpinionLastRead lastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinionId, isAdmin)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));
        lastRead.updateLastReadChatId(new ObjectId(MAX_OBJECT_ID));
        opinionLastReadRepository.save(lastRead);
    }

    public void updateLastReadToLastChatId(final Long opinionId, final boolean isAdmin) {
        OpinionLastRead lastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinionId, isAdmin)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));

        OpinionChat lastCHat = opinionChatRepository.findTop1ByOpinionIdOrderByIdDesc(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));

        lastRead.updateLastReadChatId(lastCHat.getId());
        opinionLastReadRepository.save(lastRead);
    }

    public void saveChat(
            final Long userId, final Long opinionId,
            final String chat, final List<String> images,
            final boolean isAdmin, final LocalDateTime createdAt) {
        opinionChatRepository.save(
                OpinionChat.builder()
                        .memberId(userId)
                        .opinionId(opinionId)
                        .chat(chat)
                        .images(images)
                        .isAdmin(isAdmin)
                        .createdAt(createdAt)
                        .build()
        );
    }
}
