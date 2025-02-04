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
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.university.domain.University;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

/**
 * 학생이 사용하는 말해요 관련 서비스 로직을 처리하는 클래스.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MemberOpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final MemberRepository memberRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;

    /**
     * 1개월 동안의 의견 통계 정보를 계산합니다.
     *
     * @param memberId 학생 ID
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
     * 새로운 의견(채팅방)을 생성합니다.
     *
     * @param creationRequest 말해요 채팅방 생성 요청 객체
     * @param memberId        학생 ID
     * @return OpinionCreationResponse 생성된 말해요 채팅방의 ID를 포함한 응답 객체
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
     * 학생이 특정 의견을 리마인드하도록 설정합니다.
     *
     * @param opinionId 의견(채팅방) ID
     * @throws OpinionException opinion을 찾을 수 없는 경우 예외 발생
     */
    @Transactional
    public void remindOpinion(final Long opinionId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        opinion.setRemind();
    }

    /**
     * 학생이 생성한 말해요 리스트를 조회합니다.
     *
     * @param memberId 학생 ID
     * @return MemberOpinionListResponse 학생이 생성한 말해요 채팅방 목록 응답 객체
     */
    public List<MemberOpinionInfoResponse> findMemberOpinionList(final Long memberId) {
        final List<Opinion> opinions = opinionRepository.findAllByMemberId(memberId);
        return convertToMemberOpinionInfoList(opinions);
    }

    /**
     * Opinion 엔티티를 생성합니다.
     *
     * @param creationRequest 의견 생성 요청 객체
     * @param member          회원 객체
     * @return Opinion 생성된 의견 엔티티
     */
    private Opinion createOpinionEntity(final OpinionCreationRequest creationRequest, final Member member) {
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
     * @param opinionId       생성된 말해요 채팅방 ID
     */
    private void saveOpinionChat(final OpinionCreationRequest creationRequest,
                                 final Member member,
                                 final Long opinionId) {
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
     * 마지막 읽은 채팅의 ID와 실제 마지막 채팅의 ID를 비교하여 hasNewChat 값을 설정합니다.
     *
     * @param opinions 해당 학생이 개설한 말해요 채팅방 리스트
     * @return 학생의 말해요 채팅방 정보 리스트
     */
    private List<MemberOpinionInfoResponse> convertToMemberOpinionInfoList(final List<Opinion> opinions) {
        return opinions.stream()
                .map(opinion -> {
                    final OpinionLastRead opinionLastRead = opinionLastReadRepository.findByOpinionIdAndIsAdmin(opinion.getId(), false)
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_LAST_READ));
                    final OpinionChat lastChat = opinionChatRepository.findTopByOpinionIdOrderByIdDesc(opinion.getId())
                            .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION_CHAT));
                    return MemberOpinionInfoResponse.builder()
                            .opinionId(opinion.getId())
                            .opinionType(opinion.getOpinionType())
                            .categoryType(opinion.getCategoryType())
                            .lastChatId(lastChat.getId())
                            .lastChat(lastChat.getChat())
                            .lastChatCreatedAt(LocalDateTime.ofInstant(
                                    Instant.ofEpochSecond(lastChat.getId().getTimestamp()),
                                    ZoneId.of("Asia/Seoul")))
                            .hasNewChat(!opinionLastRead.getLastReadChatId().equals(lastChat.getId()))
                            .build();
                })
                .sorted()
                .toList();
    }
}
