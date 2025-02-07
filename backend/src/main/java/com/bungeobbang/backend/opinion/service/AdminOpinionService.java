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
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 학생회에서 말해요 채팅방 목록을 관리하기 위한 서비스 클래스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminOpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;

    /**
     * 학생회가 말해요 채팅방 목록을 조회합니다.
     * 선택된 카테고리에 해당하는 채팅방 목록만 반환합니다.
     *
     * @param categoryTypes 조회를 원하는 카테고리의 목록. 없을 경우 전체 카테고리를 조회합니다.
     * @return AdminOpinionInfoResponse의 리스트로, 말해요 채팅방 목록 응답 객체.
     */
    public List<AdminOpinionsInfoResponse> findAdminOpinionList(final Set<CategoryType> categoryTypes) {
        final List<Opinion> opinions = getOpinionsByCategories(categoryTypes);
        return convertToAdminOpinionInfoList(opinions);
    }

    /**
     * 카테고리 필터를 적용하여 말해요 채팅방(Opinion) 목록을 조회합니다.
     *
     * @param categoryTypes 조회를 원하는 카테고리의 목록. 없을 경우 전체 카테고리를 조회합니다.
     * @return 카테고리에 해당하는 말해요 채팅방 목록.
     */
    private List<Opinion> getOpinionsByCategories(final Set<CategoryType> categoryTypes) {
        if (categoryTypes == null || categoryTypes.isEmpty()) {
            return opinionRepository.findAll(); // 카테고리가 없으면 전체 조회
        }
        return opinionRepository.findAllByCategoryTypeIn(categoryTypes); // 선택된 카테고리에 해당하는 목록 조회
    }

    /**
     * 말해요 채팅방(Opinion) 목록을 AdminOpinionInfoResponse 목록으로 변환합니다.
     * 각 채팅방의 최신 채팅 정보를 조회하고, 마지막 읽은 채팅 ID와 비교하여 새로운 채팅 여부를 설정합니다.
     *
     * @param opinions 말해요 채팅방(Opinion) 목록.
     * @return AdminOpinionInfoResponse의 리스트로, 각 채팅방의 정보가 포함된 응답 객체.
     * @throws OpinionException 말해요 채팅방의 마지막 읽은 채팅 또는 최신 채팅 조회 실패 시 발생.
     */
    private List<AdminOpinionsInfoResponse> convertToAdminOpinionInfoList(final List<Opinion> opinions) {
        List<Long> opinionIds = opinions.stream()
                .map(Opinion::getId)
                .toList();

        // <OpinionId, OpinionLastRead>
        // 마지막 읽은 채팅 조회
        List<OpinionLastRead> list = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, true);
        Map<Long, OpinionLastRead> lastReadMap = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, true)
                .stream()
                .collect(Collectors.toMap(OpinionLastRead::getOpinionId, Function.identity()));

        // <OpinionId, OpinionChat>
        // 실제 마지막 채팅 조회
        Map<Long, OpinionChat> lastChatMap = opinionChatRepository.findLatestChatsByOpinionIds(opinionIds)
                .stream()
                .collect(Collectors.toMap(OpinionChat::getOpinionId, Function.identity()));

        return opinions.stream()
                .map(opinion -> {
                    OpinionLastRead lastRead = lastReadMap.get(opinion.getId());
                    OpinionChat lastChat = lastChatMap.get(opinion.getId());

                    if (lastRead == null) throw new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ);
                    if (lastChat == null) throw new OpinionException(ErrorCode.INVALID_OPINION_CHAT);

                    return AdminOpinionsInfoResponse.of(opinion, lastChat, lastRead);
                })
                .sorted()
                .toList();
    }
}
