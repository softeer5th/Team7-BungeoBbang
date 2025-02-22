package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.AdminException;
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
import com.bungeobbang.backend.opinion.domain.repository.*;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionStatisticsResponse;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 학생회에서 말해요 채팅방 목록을 관리하기 위한 서비스 클래스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminOpinionService {

    public static final String ASIA_SEOUL = "Asia/Seoul";
    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;
    private final OpinionLastReadRepository opinionLastReadRepository;
    private final AnsweredOpinionRepository answeredOpinionRepository;
    private final CustomAnsweredOpinionRepository customAnsweredOpinionRepository;
    private final AdminRepository adminRepository;
    private final MemberRepository memberRepository;
    private static final String MIN_OBJECT_ID = "000000000000000000000000";

    /**
     * 학생회가 말해요 채팅방 목록을 조회합니다.
     * 선택된 카테고리에 해당하는 채팅방 목록만 반환합니다.
     *
     * @param categoryTypes 조회를 원하는 카테고리의 목록. 없을 경우 전체 카테고리를 조회합니다.
     * @return AdminOpinionInfoResponse의 리스트로, 말해요 채팅방 목록 응답 객체.
     */
    public List<AdminOpinionsInfoResponse> findAdminOpinionList(final Set<CategoryType> categoryTypes, final Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        // 리마인드 된 채팅방 조회.
        final Map<Long, Opinion> remindedOpinions = getOpinionsByCategories(categoryTypes, admin.getUniversity().getId(), true);
        // 리마인드 안된 채팅방 조회
        final Map<Long, Opinion> unRemindedOpinions = getOpinionsByCategories(categoryTypes, admin.getUniversity().getId(), false);

        List<AdminOpinionsInfoResponse> responses = new ArrayList<>(convertToAdminOpinionInfoList(remindedOpinions));
        responses.addAll(convertToAdminOpinionInfoList(unRemindedOpinions));

        return responses;
    }

    /**
     * 카테고리 필터를 적용하여 말해요 채팅방(Opinion) 목록을 조회합니다.
     *
     * @param categoryTypes 조회를 원하는 카테고리의 목록. 없을 경우 전체 카테고리를 조회합니다.
     * @return 카테고리에 해당하는 말해요 채팅방 목록.
     */
    private Map<Long, Opinion> getOpinionsByCategories(final Set<CategoryType> categoryTypes, final Long universityId, boolean isRemind) {
        // 카테고리가 없으면 해당 대학 말해요 전체 조회
        if (categoryTypes == null || categoryTypes.isEmpty()) {
            return opinionRepository.findAllByUniversityIdAndIsRemind(universityId, isRemind)
                    .stream().collect(Collectors.toMap(Opinion::getId, Function.identity()));
        }
        // 선택된 카테고리에 해당하는 목록 조회
        return opinionRepository.findAllByCategoryTypeInAndUniversityIdAndIsRemind(categoryTypes, universityId, isRemind)
                .stream().collect(Collectors.toMap(Opinion::getId, Function.identity()));
    }

    /**
     * 말해요 채팅방(Opinion) 목록을 AdminOpinionInfoResponse 목록으로 변환합니다.
     * 각 채팅방의 최신 채팅 정보를 조회하고, 마지막 읽은 채팅 ID와 비교하여 새로운 채팅 여부를 설정합니다.
     *
     * @param opinions 말해요 채팅방(Opinion) 목록.
     * @return AdminOpinionInfoResponse의 리스트로, 각 채팅방의 정보가 포함된 응답 객체.
     * @throws OpinionException 말해요 채팅방의 마지막 읽은 채팅 또는 최신 채팅 조회 실패 시 발생.
     */
    private List<AdminOpinionsInfoResponse> convertToAdminOpinionInfoList(final Map<Long, Opinion> opinions) {
        final List<Long> opinionIds = new ArrayList<>(opinions.keySet());
        if (opinionIds.isEmpty())
            return Collections.emptyList();

        // <OpinionId, OpinionLastRead>
        // 마지막 읽은 채팅 조회
        final Map<Long, OpinionLastRead> lastReadMap = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, true)
                .stream()
                .collect(Collectors.toMap(OpinionLastRead::getOpinionId, Function.identity()));

        // 실제 마지막 채팅 조회
        List<OpinionChat> lastChats = opinionChatRepository.findLatestChatsByOpinionIds(opinionIds);
        List<AdminOpinionsInfoResponse> results = new ArrayList<>();
        for (OpinionChat lastChat : lastChats) {
            Opinion opinion = opinions.get(lastChat.getOpinionId());
            OpinionLastRead lastRead = lastReadMap.get(lastChat.getOpinionId());
            if (lastRead == null) {
                lastRead = opinionLastReadRepository.save(OpinionLastRead
                        .builder()
                        .opinionId(opinion.getId())
                        .isAdmin(true)
                        .lastReadChatId(new ObjectId(MIN_OBJECT_ID))
                        .build());
            }
            results.add(AdminOpinionsInfoResponse.of(opinion, lastChat, lastRead));
        }
        return results;
    }

    @Transactional
    public void unsetRemindOpinion(final Long opinionId) {
        final Opinion opinion = opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.INVALID_OPINION));
        opinion.unsetRemind();
    }

    public AdminOpinionStatisticsResponse computeYearlyStatistics(final Year year, final Accessor accessor) {
        final LocalDateTime startOfYear = year.atMonth(1).atDay(1).atStartOfDay();
        final LocalDateTime endOfYear = year.atMonth(12).atEndOfMonth().atTime(23, 59, 59);
        return getStatisticsByPeriod(startOfYear, endOfYear, accessor);
    }

    public AdminOpinionStatisticsResponse computeMonthlyStatistics(final YearMonth yearMonth, final Accessor accessor) {
        final LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        final LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        return getStatisticsByPeriod(startOfMonth, endOfMonth, accessor);
    }

    /**
     * 특정 기간의 의견 및 답변 통계를 계산하는 공통 메서드
     */
    private AdminOpinionStatisticsResponse getStatisticsByPeriod(
            final LocalDateTime startDateTime,
            final LocalDateTime endDateTime,
            final Accessor accessor) {
        final Long universityId = getUniversityId(accessor);

        // 해당 기간의 의견 조회
        final List<Opinion> opinions = opinionRepository.findAllByCreatedAtBetweenAndUniversityId(startDateTime, endDateTime, universityId);

        // 기본값이 0인 CategoryType Map 초기화
        final Map<CategoryType, Integer> categoryTypeCounts = Arrays.stream(CategoryType.values())
                .collect(Collectors.toMap(type -> type, type -> 0));

        // 기본값이 0인 OpinionType Map 초기화
        final Map<OpinionType, Integer> opinionTypeCounts = Arrays.stream(OpinionType.values())
                .collect(Collectors.toMap(type -> type, type -> 0));

        // 의견 수 계산
        final Long opinionCount = (long) opinions.size();

        // MongoDB에서 답변 개수 조회
        final Long answerCount = getAnsweredCountByPeriod(startDateTime, endDateTime, universityId);

        // 의견 통계 반영
        for (Opinion opinion : opinions) {
            categoryTypeCounts.put(opinion.getCategoryType(), categoryTypeCounts.get(opinion.getCategoryType()) + 1);
            opinionTypeCounts.put(opinion.getOpinionType(), opinionTypeCounts.get(opinion.getOpinionType()) + 1);
        }

        // 결과 반환
        return AdminOpinionStatisticsResponse.builder()
                .opinionCount(opinionCount)
                .answerCount(answerCount)
                .categoryTypeCounts(categoryTypeCounts)
                .opinionTypeCounts(opinionTypeCounts)
                .build();
    }

    /**
     * MongoDB에서 특정 기간 동안 생성된 AnsweredOpinion 개수를 조회
     */
    private Long getAnsweredCountByPeriod(final LocalDateTime startDateTime, final LocalDateTime endDateTime, final Long universityId) {
        final ZoneId koreaZone = ZoneId.of(ASIA_SEOUL);

        final ObjectId startObjectId = new ObjectId(new Date(startDateTime.atZone(koreaZone).toInstant().toEpochMilli()));
        final ObjectId endObjectId = new ObjectId(new Date(endDateTime.atZone(koreaZone).toInstant().toEpochMilli()));

        return answeredOpinionRepository.countByIdBetweenAndUniversityId(startObjectId, endObjectId, universityId);
    }

    public void updateAnsweredOpinion(final OpinionChat savedChat) {
        customAnsweredOpinionRepository.upsert(
                savedChat.getOpinionId(),
                getAdminUniversityId(savedChat.getMemberId()));
    }

    private Long getUniversityId(final Accessor accessor) {
        if (accessor.isAdmin()) {
            return getAdminUniversityId(accessor.id());
        }
        return getMemberUniversityId(accessor.id());
    }

    private Long getAdminUniversityId(final Long adminId) {
        final Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        return admin.getUniversity().getId();
    }

    private Long getMemberUniversityId(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.INVALID_MEMBER));
        return member.getUniversity().getId();
    }
}
