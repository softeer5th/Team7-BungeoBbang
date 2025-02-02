package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionInfo;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionListResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.university.domain.University;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final MemberRepository memberRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;

    public OpinionStatisticsResponse computeOpinionStatistics(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));
        final List<Opinion> opinions = opinionRepository.findAllByCreatedAtBetweenAndUniversityId(
                LocalDateTime.now().minusMonths(1L),
                LocalDateTime.now(),
                member.getUniversity().getId());
        final Long opinionCount = Long.valueOf(opinions.size());


        final List<OpinionChat> opinionChats = opinionChatRepository.findDistinctOpinionIdByIsAdminTrue();
        // 소속 대학의 1달간 모든 '말해요' opinion에 대해서, 학생회의(is_admin==true) 채팅이 있었던 경우 카운트
        final Long responseCount = opinions.stream()
                .filter(opinion -> opinionChats.stream()
                        .anyMatch(chat -> chat.getOpinionId().equals(opinion.getId()))).count();

        return new OpinionStatisticsResponse(opinionCount, responseCount);
    }

    public OpinionCreationResponse createOpinion(
            final OpinionCreationRequest creationRequest,
            final Long memberId
    ) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));

        final Opinion opinion = createOpinionEntity(creationRequest, member);
        final Long opinionId = opinionRepository.save(opinion).getId();;
        saveOpinionChat(creationRequest, member, opinionId);

        return new OpinionCreationResponse(opinionId);
    }

    @Transactional
    public void remindOpinion(final Long roomId) {
        final Opinion opinion = opinionRepository.findById(roomId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        opinion.editIsRemind(true);
    }

    public MemberOpinionListResponse findMemberOpinionList(final Long cursor, final Long memberId) {
        List<Opinion> opinions = opinionRepository.findRecentOpinionsByMemberIdAndCursor(memberId, cursor);

        boolean hasNextPage = true;
        Long nextCursor = -1L;
        if (opinions.size() < 9) hasNextPage = false;
        if (hasNextPage) nextCursor = opinions.get(8).getId();

        List<MemberOpinionInfo> opinionInfos = convertToMemberOpinionInfoList(opinions);
        return new MemberOpinionListResponse(opinionInfos, nextCursor, hasNextPage);
    }

    private Opinion createOpinionEntity(OpinionCreationRequest creationRequest, Member member) {
        final University university = member.getUniversity();
        return new Opinion(
                university,
                OpinionType.fromString(creationRequest.type()),
                CategoryType.fromString(creationRequest.category()),
                member,
                false,
                1
        );
    }

    private void saveOpinionChat(OpinionCreationRequest creationRequest, Member member, Long opinionId) {
        final OpinionChat opinionChat = new OpinionChat(
                member.getId(),
                opinionId,
                creationRequest.content(),
                creationRequest.images(),
                false,
                LocalDateTime.now()
        );
        opinionChatRepository.save(opinionChat);
    }

    private List<MemberOpinionInfo> convertToMemberOpinionInfoList(List<Opinion> opinions) {
        return opinions.stream()
                .map(opinion -> {
                    log.debug("opinionId: {}", opinion.getId());

                    final OpinionLastRead opinionLastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinion.getId(), false)
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));
                    log.debug("opinionLastReadChatId: {}", opinionLastRead.getLastReadChatId());

                    final OpinionChat lastChat = opinionChatRepository.findTopByOpinionIdOrderByCreatedAtDesc(opinion.getId())
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));
                    log.debug("lastChatId: " + lastChat.getId());

                    return new MemberOpinionInfo(
                            opinion.getId(),
                            opinion.getOpinionType().getDescription(),
                            opinion.getCategoryType().getDescription(),
                            lastChat.getChat(),
                            lastChat.getCreatedAt(),
                            !opinionLastRead.getLastReadChatId().equals(lastChat.getId())
                    );
                })
                .collect(Collectors.toList());
    }
}
