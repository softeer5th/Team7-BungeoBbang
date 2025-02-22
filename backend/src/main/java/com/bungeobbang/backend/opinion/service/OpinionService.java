package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.repository.CustomOpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.CustomOpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionDetailResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;


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
    private final OpinionRepository opinionRepository;
    private final CustomOpinionChatRepository customOpinionChatRepository;
    private final CustomOpinionLastReadRepository customOpinionLastReadRepository;
    private final AdminRepository adminRepository;

    /**
     * 특정 말해요(opinionId)의 채팅 내역을 조회하는 메서드.
     *
     * @param opinionId  조회할 말해요 채팅방의 ID
     * @param chatId 조회를 시작할 채팅 메시지의 ID
     * @param accessor  요청을 보낸 유저의 접근자
     * @param scroll 스크롤 방향
     * @return OpinionChatResponse 리스트 (해당 채팅방의 메시지 목록)
     */
    public List<OpinionChatResponse> findOpinionChat(final Long opinionId, ObjectId chatId, final Accessor accessor, ScrollType scroll) {
        validateOpinion(opinionId, accessor);
        // scroll == INITIAL 이면 마지막읽은 채팅 포함 10개 조회
        // scroll=up 이면 과거 채팅 10개 조회, down 이면 최신 채팅 10개 조회
        return customOpinionChatRepository.findOpinionChats(opinionId, chatId, scroll)
                .stream()
                .map(opinionChat -> OpinionChatResponse.of(opinionChat, accessor.id(), opinionId))
                .toList();
    }

    private void validateOpinion(final Long opinionId, final Accessor accessor) {
        Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));

        // 학생 : 본인이 작성한 말해요가 아닌 경우
        if (accessor.isMember() && (!Objects.equals(opinion.getMember().getId(), accessor.id())))
            throw new OpinionException(ErrorCode.UNAUTHORIZED_OPINION_ACCESS);
        if (accessor.isAdmin()) {
            Admin admin = adminRepository.findById(accessor.id())
                    .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_ADMIN));
            // 학생회 : 본인 대학의 말해요가 아닌 경우
            if (!admin.getUniversity().getId().equals(opinion.getUniversity().getId()))
                throw new OpinionException(ErrorCode.UNAUTHORIZED_UNIVERSITY_OPINION_ACCESS);
        }
    }

    public OpinionDetailResponse findOpinionDetail(final Long opinionId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        return new OpinionDetailResponse(opinion.getUniversity().getName(), opinion.isRemind());
    }

    public void updateLastReadToMax(final Long opinionId, final boolean isAdmin) {
        customOpinionLastReadRepository.updateLastRead(opinionId, isAdmin, new ObjectId(MAX_OBJECT_ID));
    }

    public void updateLastReadToLastChatId(final Long opinionId, final boolean isAdmin) {
        OpinionChat lastChat = opinionChatRepository.findTop1ByOpinionIdOrderByIdDesc(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));
        customOpinionLastReadRepository.updateLastRead(opinionId, isAdmin, lastChat.getId());
    }

    public OpinionChat saveChat(
            final Long userId, final Long opinionId,
            final String chat, final List<String> images,
            final boolean isAdmin, final LocalDateTime createdAt) {
        return opinionChatRepository.save(
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

    // 최신 채팅이 3개 미만이거나, 3개 중 학생회 채팅이 존재하는 경우 OK.
    // 최신 채팅 3개 모두 학생 채팅인경우 예외 발생
    public void validateChatCount(Long opinionId) {
        List<OpinionChat> chats = opinionChatRepository.findTop3ByOpinionIdOrderByIdDesc(opinionId);
        if (chats.size() < 3) return;
        for (OpinionChat opinionChat : chats) {
            if (opinionChat.isAdmin()) return;
        }
        throw new OpinionException(ErrorCode.CHAT_COUNT_LIMIT_EXCEEDED);
    }
}
