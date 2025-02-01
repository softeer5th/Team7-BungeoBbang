package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.exception.UniversityException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionListResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import com.bungeobbang.backend.university.domain.University;
import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;

    private final UniversityRepository universityRepository;
    private final MemberRepository memberRepository;

    private static final Integer eachCursorSize = 8;

    public OpinionStatisticsResponse computeOpinionStatistics(Accessor accessor) {
        List<Opinion> opinions = opinionRepository.findAllByCreatedAtBetweenAndUniversityId(
                        LocalDateTime.now().minusMonths(1L),
                        LocalDateTime.now(),
                        accessor.universityId());
        Long inquires = Long.valueOf(opinions.size());

        Set<Long> opinionIds = opinionChatRepository.findDistinctOpinionIdsByAdmin();

        // 소속 대학의 1달간 모든 '말해요' opinion에 대해서, 학생회의(is_admin==true) 채팅이 있었던 경우 카운트
        Long responses = opinions.stream()
                .filter(opinion -> opinionIds.contains(opinion.getId()))
                .count();

        return new OpinionStatisticsResponse(inquires, responses);
    }

    public OpinionCreationResponse createOpinion(
            final OpinionCreationRequest creationRequest,
            final Accessor accessor
    ) {
        University university = universityRepository.findById(accessor.universityId())
                .orElseThrow(() -> new UniversityException(ErrorCode.UNIVERSITY_LOOKUP_FAILED));
        Member member = memberRepository.findById(accessor.id())
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_LOOKUP_FAILED));

        // 말해요 채팅방 생성
        Opinion opinion = new Opinion(
                university,
                creationRequest.categoryType(),
                creationRequest.opinionType(),
                member,
                false,
                1);
        Long opinionId = opinionRepository.save(opinion).getId();

        // 채팅 저장
        OpinionChat opinionChat = new OpinionChat(
                member.getId(),
                opinionId,
                creationRequest.content(),
                creationRequest.images(),
                false,
                LocalDateTime.now());
        opinionChatRepository.save(opinionChat);

        return new OpinionCreationResponse(opinionId);
    }

    @Transactional
    public void changeOpinionRemind(final Long roomId) {
        Opinion opinion = opinionRepository.findById(roomId)
                .orElseThrow(() -> new OpinionException(ErrorCode.OPINION_LOOKUP_FAILED));
        opinion.editIsRemind(true);
    }

}
