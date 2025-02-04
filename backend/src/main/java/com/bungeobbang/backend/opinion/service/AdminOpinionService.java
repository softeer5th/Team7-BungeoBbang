package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminOpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;

    /**
     * 말해요의 전체 채팅방 리스트를 조회합니다.
     *
     * @return AdminOpinionInfoListResponse 모든 말해요 채팅방 목록 응답 객체
     */
    public List<AdminOpinionInfoResponse> findAdminOpinionList(List<CategoryType> categoryTypes) {
        final List<Opinion> opinions = opinionRepository.findAllByCategoryTypeIn(categoryTypes);
        return convertToAdminOpinionInfoList(opinions);
    }

    /**
     * Opinion 리스트를 MemberOpinionInfo 리스트로 변환합니다.
     * 마지막 읽은 채팅의 ID와 실제 마지막 채팅의 ID를 비교하여 isNew 값을 설정합니다.
     *
     * @param opinions 모든 말해요 채팅방 리스트
     * @return 모든 말해요 채팅방 정보 리스트
     */
    private List<AdminOpinionInfoResponse> convertToAdminOpinionInfoList(final List<Opinion> opinions) {
        return opinions.stream()
                .map(opinion -> {
                    log.debug("opinionId: {}", opinion.getId());

                    final OpinionLastRead opinionLastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinion.getId(), false)
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));
                    log.debug("opinionLastReadChatId: {}", opinionLastRead.getLastReadChatId());

                    final OpinionChat lastChat = opinionChatRepository.findTopByOpinionIdOrderByCreatedAtDesc(opinion.getId())
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));
                    log.debug("lastChatId: " + lastChat.getId());

                    return AdminOpinionInfoResponse.builder()
                            .opinionId(opinion.getId())
                            .opinionType(opinion.getOpinionType())
                            .categoryType(opinion.getCategoryType())
                            .lastChat(lastChat.getChat())
                            .lastChatCreatedAt(lastChat.getCreatedAt())
                            .isNew(!opinionLastRead.getLastReadChatId().equals(lastChat.getId()))
                            .isRemind(opinion.isRemind())
                            .build();
                })
                .sorted()
                .toList();
    }
}
