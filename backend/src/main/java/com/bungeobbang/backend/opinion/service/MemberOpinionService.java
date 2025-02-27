package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.chat.event.opinion.OpinionCreationEvent;
import com.bungeobbang.backend.chat.type.SocketEventType;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.opinion.domain.AnsweredOpinion;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.AnsweredOpinionRepository;
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
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.bungeobbang.backend.opinion.service.AdminOpinionService.ASIA_SEOUL;

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
    private final AnsweredOpinionRepository answeredOpinionRepository;

    private final OpinionRealTimeChatService opinionRealTimeChatService;
    private static final String MIN_OBJECT_ID = "000000000000000000000000";

    /**
     * 1개월 동안의 의견 통계 정보를 계산합니다.
     *
     * @param memberId 학생 ID
     * @return OpinionStatisticsResponse 1달간 말해요 통계 응답 객체
     * @throws MemberException 학생 정보를 조회할 수 없는 경우 예외 발생
     */
    public OpinionStatisticsResponse computeRecentMonthlyOpinionStatistics(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));

        LocalDateTime startDateTime = LocalDateTime.now().minusMonths(1);
        LocalDateTime endDateTime = LocalDateTime.now();
        final Long opinionCount = opinionRepository.countByCreatedAtBetweenAndUniversityId(
                LocalDateTime.now().minusMonths(1),
                LocalDateTime.now(),
                member.getUniversity().getId()
        );
        final Long answerCount = getAnsweredCountByPeriod(startDateTime, endDateTime, member.getUniversity().getId());
        final double rawRate = (double) answerCount / opinionCount;
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

        // 새로운 말해요가 생겻다고 학생회에게 알림
        opinionRealTimeChatService.sendOpinionStartToUniversity(member.getUniversity().getId(),
                new OpinionCreationEvent(
                        SocketEventType.START,
                        creationRequest.categoryType(),
                        creationRequest.opinionType(),
                        opinionId,
                        creationRequest.content(),
                        opinion.getCreatedAt()
                ));


        return new OpinionCreationResponse(opinionId);
    }

    @Transactional
    public void deleteOpinion(final Long opinionId, final Long memberId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        validateOpinionAuthor(opinion, memberId);
        opinionRepository.delete(opinion);
        final AnsweredOpinion answeredOpinion = answeredOpinionRepository.findByOpinionId(opinionId)
                        .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        answeredOpinionRepository.delete(answeredOpinion);
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

    /**
     * 학생이 생성한 말해요 리스트를 조회합니다.
     *
     * @param memberId 학생 ID
     * @return MemberOpinionListResponse 학생이 생성한 말해요 채팅방 목록 응답 객체
     */
    public List<MemberOpinionsInfoResponse> findMemberOpinionList(final Long memberId) {
        final Map<Long, Opinion> opinions = opinionRepository.findAllByMemberId(memberId)
                .stream().collect(Collectors.toMap(Opinion::getId, Function.identity()));
        return convertToMemberOpinionInfoList(opinions);
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
                .createdAt(LocalDateTime.now())
                .build();
        return opinionChatRepository.save(opinionChat).getId();
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
                .chatCount(1L)
                .build();
    }

    /**
     * Opinion 리스트를 MemberOpinionInfoResponse 리스트로 변환합니다.
     * 마지막 읽은 채팅의 ID와 실제 마지막 채팅의 ID를 비교하여 hasNewChat 값을 설정합니다.
     * 정렬 기준 : 마지막 채팅의 시간 순서 (가장 최근 채팅부터 조회)
     *
     * @param opinions 해당 학생이 개설한 말해요 채팅방 리스트
     * @return 학생의 말해요 채팅방 정보 리스트
     */
    private List<MemberOpinionsInfoResponse> convertToMemberOpinionInfoList(final Map<Long, Opinion> opinions) {
        final List<Long> opinionIds = new ArrayList<>(opinions.keySet());

        // <OpinionId, OpinionLastRead>
        // 마지막 읽은 채팅 조회
        final Map<Long, OpinionLastRead> lastReadMap = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, false)
                .stream()
                .collect(Collectors.toMap(OpinionLastRead::getOpinionId, Function.identity()));

        // 실제 마지막 채팅 조회
        List<OpinionChat> lastChats = opinionChatRepository.findLatestChatsByOpinionIds(opinionIds);
        List<MemberOpinionsInfoResponse> result = new ArrayList<>();
        for (OpinionChat lastChat : lastChats) {
            Opinion opinion = opinions.get(lastChat.getOpinionId());
            OpinionLastRead lastRead = lastReadMap.get(lastChat.getOpinionId());
            if (lastRead == null) {
                lastRead = opinionLastReadRepository.save(
                        OpinionLastRead.builder()
                                .opinionId(opinion.getId())
                                .isAdmin(false)
                                .lastReadChatId(new ObjectId(MIN_OBJECT_ID))
                                .build());
            }
            result.add(MemberOpinionsInfoResponse.of(opinion, lastChat, lastRead));
        }
        return result;
    }

    private Long getAnsweredCountByPeriod(final LocalDateTime startDateTime, final LocalDateTime endDateTime, final Long universityId) {
        final ZoneId koreaZone = ZoneId.of(ASIA_SEOUL);

        final ObjectId startObjectId = new ObjectId(new Date(startDateTime.atZone(koreaZone).toInstant().toEpochMilli()));
        final ObjectId endObjectId = new ObjectId(new Date(endDateTime.atZone(koreaZone).toInstant().toEpochMilli()));

        return answeredOpinionRepository.countByIdBetweenAndUniversityId(startObjectId, endObjectId, universityId);
    }

    private void validateOpinionAuthor(final Opinion opinion, final Long memberId) {
        if (!opinion.getMember().getId().equals(memberId))
            throw new OpinionException(ErrorCode.UNAUTHORIZED_OPINION_ACCESS);
    }

}
