package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.*;
import com.bungeobbang.backend.university.domain.University;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 말해요 서비스 로직을 처리하는 클래스.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final MemberRepository memberRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;

    /**
     * 의견 통계 정보를 계산합니다.
     *
     * @param memberId 회원 ID
     * @return OpinionStatisticsResponse 1달간 말해요 통계 응답 객체
     * @throws MemberException 학생 정보를 조회할 수 없는 경우 예외 발생
     */
    public OpinionStatisticsResponse computeOpinionStatistics(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));
        final List<Opinion> opinions = opinionRepository.findAllByCreatedAtBetweenAndUniversityId(
                LocalDateTime.now().minusMonths(1L),
                LocalDateTime.now(),
                member.getUniversity().getId());
        final List<Long> opinionIds = opinions.stream()
                .map(Opinion::getId)
                .toList();

        final List<Long> opinionChats = opinionChatRepository.findDistinctOpinionIdByIsAdminTrue(opinionIds);

        final int opinionCount = opinions.size();
        final int responseCount = opinionChats.size();
        final double rawRate = (double) responseCount / opinionCount;
        final int adminResponseRate = (int) Math.round(rawRate * 100);
        return new OpinionStatisticsResponse(opinionCount, adminResponseRate);
    }

    /**
     * 말해요의 새로운 의견 생성(==채팅방 생성)
     *
     * @param creationRequest 의견 생성 요청 객체
     * @param memberId        학생 ID
     * @return OpinionCreationResponse roomId(==opinionId)
     * @throws MemberException 학생 정보를 조회할 수 없는 경우 예외 발생
     */
    public OpinionCreationResponse createOpinion(
            final OpinionCreationRequest creationRequest,
            final Long memberId
    ) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));

        final Opinion opinion = createOpinionEntity(creationRequest, member);
        final Long opinionId = opinionRepository.save(opinion).getId();
        saveOpinionChat(creationRequest, member, opinionId);

        return new OpinionCreationResponse(opinionId);
    }

    /**
     * 학생의 리마인드를 처리합니다.
     *
     * @param roomId 채팅방ID(==opinionId)
     * @throws OpinionException 말해요 채팅방을 조회할 수 없는 경우 예외 발생
     */
    @Transactional
    public void remindOpinion(final Long roomId) {
        final Opinion opinion = opinionRepository.findById(roomId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        opinion.editIsRemind(true);
    }

    /**
     * 회원의 의견 목록을 조회합니다.
     *
     * @param cursor   이전 응답에서 반환했던 cursor(== 이전 응답에서의 마지막 opinionId)
     * @param memberId 학생 ID
     * @return MemberOpinionListResponse 학생 본인이 만들었던 말해요 채팅방 정보 리스트
     */
    public MemberOpinionInfoListResponse findMemberOpinionList(final Long cursor, final Long memberId) {
        List<Opinion> opinions = opinionRepository.findRecentOpinionsByMemberIdAndCursor(memberId, cursor);

        boolean hasNextPage = true;
        Long nextCursor = -1L;
        if (opinions.size() < 9) hasNextPage = false;
        if (hasNextPage) nextCursor = opinions.get(8).getId();

        List<MemberOpinionInfoResponse> opinionInfos = convertToMemberOpinionInfoList(opinions);
        return new MemberOpinionInfoListResponse(opinionInfos, nextCursor, hasNextPage);
    }

    /**
     * Opinion 엔티티를 생성합니다.
     *
     * @param creationRequest 의견 생성 요청 객체
     * @param member          회원 객체
     * @return Opinion 생성된 의견 엔티티
     */
    private Opinion createOpinionEntity(OpinionCreationRequest creationRequest, Member member) {
        final University university = member.getUniversity();
        return Opinion.builder()
                .university(university)
                .opinionType(creationRequest.opinionType())
                .categoryType(creationRequest.categoryType())
                .member(member)
                .isRemind(false)
                .chatCount(1)
                .build();
    }

    /**
     * OpinionChat 엔티티를 저장합니다.
     *
     * @param creationRequest 말해요 채팅방 생성 요청 객체
     * @param member          학생 객체
     * @param opinionId       말해요 채팅방 ID
     */
    private void saveOpinionChat(OpinionCreationRequest creationRequest, Member member, Long opinionId) {
        final OpinionChat opinionChat = OpinionChat.builder()
                .memberId(member.getId())
                .opinionId(opinionId)
                .chat(creationRequest.content())
                .images(creationRequest.images())
                .build();
        opinionChatRepository.save(opinionChat);
    }

    /**
     * Opinion 리스트를 MemberOpinionInfo 리스트로 변환합니다.
     * 마지막 읽은 채팅의 id와 실제 마지막 채팅의 id를 비교하여 isNew를 결정합니다.
     *
     * @param opinions Opinion 리스트
     * @return List<MemberOpinionInfo> 변환된 회원 의견 정보 리스트
     */
    private List<MemberOpinionInfoResponse> convertToMemberOpinionInfoList(List<Opinion> opinions) {
        return opinions.stream()
                .map(opinion -> {
                    log.debug("opinionId: {}", opinion.getId());

                    final OpinionLastRead opinionLastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinion.getId(), false)
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));
                    log.debug("opinionLastReadChatId: {}", opinionLastRead.getLastReadChatId());

                    final OpinionChat lastChat = opinionChatRepository.findTopByOpinionIdOrderByCreatedAtDesc(opinion.getId())
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));
                    log.debug("lastChatId: " + lastChat.getId());

                    return MemberOpinionInfoResponse.builder()
                            .opinionId(opinion.getId())
                            .opinionType(opinion.getOpinionType())
                            .categoryType(opinion.getCategoryType())
                            .lastChat(lastChat.getChat())
                            .lastChatTime(lastChat.getCreatedAt())
                            .isNew(!opinionLastRead.getLastReadChatId().equals(lastChat.getId()))
                            .build();
                })
                .collect(Collectors.toList());
    }
}
