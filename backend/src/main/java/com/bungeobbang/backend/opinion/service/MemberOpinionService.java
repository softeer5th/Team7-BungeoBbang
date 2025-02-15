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
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.university.domain.University;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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
    private static final String MIN_OBJECT_ID = "000000000000000000000000";

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
     * 생성 이후 opinion_last_read 테이블에 새로 등록합니다.
     * opinionId={}, isAdmin=true lastReadChatId = ObjectId.MAX
     * opinionId={}, isAdmin=false lastReadChatId = 등록한 chatId
     *
     * @param creationRequest 말해요 채팅방 생성 요청 객체
     * @param memberId        학생 ID
     * @return OpinionCreationResponse 생성된 말해요 채팅방의 ID를 포함한 응답 객체
     * @throws MemberException 학생 정보를 조회할 수 없는 경우 예외 발생
     */
    @Transactional
    public OpinionCreationResponse createOpinion(
            final OpinionCreationRequest creationRequest,
            final Long memberId
    ) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));

        final Opinion opinion = createOpinionEntity(creationRequest, member);
        final Long opinionId = opinionRepository.save(opinion).getId();
        final ObjectId savedChatId = saveOpinionChat(creationRequest, member, opinionId);

        // 학생의 마지막 읽은 채팅 ID는 현재 저장한 채팅의 ID
        final OpinionLastRead memberLastRead = OpinionLastRead.builder()
                .opinionId(opinionId)
                .isAdmin(false)
                .lastReadChatId(savedChatId)
                .build();
        opinionLastReadRepository.save(memberLastRead);

        // 학생회의 마지막 읽은 채팅 ID는 ObjectId의 최솟값. (== 아무것도 읽지 않았다는 뜻, isNew를 띄우기 위함.)
        final OpinionLastRead adminLastRead = OpinionLastRead.builder()
                .opinionId(opinionId)
                .isAdmin(true)
                .lastReadChatId(new ObjectId(MIN_OBJECT_ID))
                .build();
        opinionLastReadRepository.save(adminLastRead);

        return new OpinionCreationResponse(opinionId);
    }

    @Transactional
    public void deleteOpinion(final Long opinionId, final Long memberId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        validateOpinionAuthor(opinion, memberId);
        opinionRepository.delete(opinion);
    }

    /**
     * 학생이 특정 의견을 리마인드하도록 설정합니다.
     *
     * @param opinionId 의견(채팅방) ID
     * @throws OpinionException opinion을 찾을 수 없는 경우 예외 발생
     */
    @Transactional
    public void remindOpinion(final Long opinionId, final Long memberId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        validateOpinionAuthor(opinion, memberId);
        if (opinion.isRemind()) throw new OpinionException(ErrorCode.ALREADY_REMINDED);
        opinion.setRemind();
    }

    private void validateOpinionAuthor(final Opinion opinion, final Long memberId) {
        if (!opinion.getMember().getId().equals(memberId))
            throw new OpinionException(ErrorCode.UNAUTHORIZED_OPINION_ACCESS);
    }

    /**
     * 학생이 생성한 말해요 리스트를 조회합니다.
     *
     * @param memberId 학생 ID
     * @return MemberOpinionListResponse 학생이 생성한 말해요 채팅방 목록 응답 객체
     */
    public List<MemberOpinionsInfoResponse> findMemberOpinionList(final Long memberId) {
        final List<Opinion> opinions = opinionRepository.findAllByMemberId(memberId);
        return convertToMemberOpinionInfoList(opinions);
    }

    /**
     * Opinion(말해요) 엔티티를 생성합니다.
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
                .build();
    }

    /**
     * OpinionChat(말해요 채팅) 엔티티를 저장합니다.
     *
     * @param creationRequest 말해요 채팅방 생성 요청 객체
     * @param member          학생 객체
     * @param opinionId       생성된 말해요 채팅방 ID
     */
    @Transactional
    public ObjectId saveOpinionChat(final OpinionCreationRequest creationRequest,
                                     final Member member,
                                     final Long opinionId) {
        final OpinionChat opinionChat = OpinionChat.builder()
                .memberId(member.getId())
                .opinionId(opinionId)
                .chat(creationRequest.content())
                .images(creationRequest.images())
                .build();
        return opinionChatRepository.save(opinionChat).getId();
    }

    /**
     * Opinion 리스트를 MemberOpinionInfoResponse 리스트로 변환합니다.
     * 마지막 읽은 채팅의 ID와 실제 마지막 채팅의 ID를 비교하여 hasNewChat 값을 설정합니다.
     * 정렬 기준 : 마지막 채팅의 시간 순서 (가장 최근 채팅부터 조회)
     *
     * @param opinions 해당 학생이 개설한 말해요 채팅방 리스트
     * @return 학생의 말해요 채팅방 정보 리스트
     */
    private List<MemberOpinionsInfoResponse> convertToMemberOpinionInfoList(final List<Opinion> opinions) {
        final List<Long> opinionIds = opinions.stream()
                .map(Opinion::getId)
                .toList();

        // <OpinionId, OpinionLastRead>
        // 마지막 읽은 채팅 조회
        final Map<Long, OpinionLastRead> lastReadMap = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, false)
                .stream()
                .collect(Collectors.toMap(OpinionLastRead::getOpinionId, Function.identity()));

        // <OpinionId, OpinionChat>
        // 실제 마지막 채팅 조회
        final Map<Long, OpinionChat> lastChatMap = opinionChatRepository.findLatestChatsByOpinionIds(opinionIds)
                .stream()
                .collect(Collectors.toMap(OpinionChat::getOpinionId, Function.identity()));

        return opinions.stream()
                .map(opinion -> {
                    OpinionLastRead lastRead = lastReadMap.get(opinion.getId());
                    OpinionChat lastChat = lastChatMap.get(opinion.getId());

                    if (lastRead == null) {
                        lastRead = opinionLastReadRepository.save(
                                OpinionLastRead.builder()
                                        .opinionId(opinion.getId())
                                        .isAdmin(false)
                                        .lastReadChatId(new ObjectId(MIN_OBJECT_ID))
                                        .build());
                    }
                    if (lastChat == null) throw new OpinionException(ErrorCode.INVALID_OPINION_CHAT);

                    return MemberOpinionsInfoResponse.of(opinion, lastChat, lastRead);
                })
                .sorted()
                .toList();
    }
}
