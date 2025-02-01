package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.auth.Accessor;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.MemberException;
import com.bungeobbang.backend.common.exception.UniversityException;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.request.OpinionCreationRequest;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.university.domain.University;
import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OpinionService {

    private final OpinionRepository opinionRepository;
    private final OpinionChatRepository opinionChatRepository;

    private final UniversityRepository universityRepository;
    private final MemberRepository memberRepository;

    public OpinionCreationResponse createOpinion(
            final OpinionCreationRequest creationRequest,
            final Accessor accessor
    ) {
        University university = universityRepository.findById(accessor.universityId())
                .orElseThrow(() -> new UniversityException(ErrorCode.UNIVERSITY_LOOKUP_FAILED));
        Member member = memberRepository.findById(accessor.memberId())
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
