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
import com.bungeobbang.backend.opinion.dto.response.MemberOpinionsInfoResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionCreationResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionStatisticsResponse;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.bungeobbang.backend.member.fixture.MemberFixture.NAVER_MEMBER;
import static com.bungeobbang.backend.opinion.fixture.OpinionChatFixture.NAVER_MEMBER1_OPINION1_CHAT;
import static com.bungeobbang.backend.opinion.fixture.OpinionChatFixture.NAVER_MEMBER2_OPINION2_CHAT;
import static com.bungeobbang.backend.opinion.fixture.OpinionFixture.NAVER_OPINION1;
import static com.bungeobbang.backend.opinion.fixture.OpinionFixture.NAVER_OPINION2;
import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberOpinionServiceTest {
    @InjectMocks
    private MemberOpinionService memberOpinionService;
    @Mock
    private OpinionRepository opinionRepository;
    @Mock
    private OpinionChatRepository opinionChatRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private OpinionLastReadRepository opinionLastReadRepository;

    @Test
    @DisplayName("1개월 동안의 의견 통계를 계산한다.")
    void computeOpinionStatistics() {
        // given
        Member member = NAVER_MEMBER;
        Opinion opinion1 = NAVER_OPINION1;
        Opinion opinion2 = NAVER_OPINION2;

        List<Opinion> opinions = List.of(opinion1, opinion2);
        List<Long> opinionIds = opinions.stream().map(Opinion::getId).toList();

        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(member));
        when(opinionRepository.findAllByCreatedAtBetweenAndUniversityId(any(), any(), anyLong()))
                .thenReturn(opinions);
        when(opinionChatRepository.findDistinctOpinionIdByIsAdminTrue(opinionIds)).thenReturn(List.of(1L));

        // when
        OpinionStatisticsResponse response = memberOpinionService.computeOpinionStatistics(1L);

        // then
        assertThat(response.opinionCount()).isEqualTo(2);
        assertThat(response.adminResponseRate()).isEqualTo(50);
    }

    @Test
    @DisplayName("학생 ID가 유효하지 않으면 예외 발생")
    void computeOpinionStatistics_InvalidMember() {
        when(memberRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> memberOpinionService.computeOpinionStatistics(1L))
                .isInstanceOf(MemberException.class)
                .hasMessage(ErrorCode.INVALID_MEMBER.getMessage());
    }

    @Test
    @DisplayName("새로운 의견을 생성한다.")
    void createOpinion() {
        // given
        Member member = NAVER_MEMBER;
        OpinionCreationRequest request = new OpinionCreationRequest(OpinionType.NEED, CategoryType.IT, "내용", emptyList());

        Opinion newOpinion = Opinion.builder()
                .id(3L)
                .university(member.getUniversity())
                .opinionType(request.opinionType())
                .categoryType(request.categoryType())
                .member(member)
                .isRemind(false)
                .build();

        ObjectId savedChatId = new ObjectId();
        OpinionChat newChat = OpinionChat.builder()
                .id(savedChatId)
                .memberId(member.getId())
                .opinionId(newOpinion.getId())
                .chat(request.content())
                .images(request.images())
                .isAdmin(false)
                .createdAt(LocalDateTime.now())
                .build();

        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(member));
        when(opinionRepository.save(any())).thenReturn(newOpinion);
        when(opinionChatRepository.save(any())).thenReturn(newChat);

        // when
        OpinionCreationResponse response = memberOpinionService.createOpinion(request, NAVER_MEMBER.getId());

        // then
        assertThat(response.opinionId()).isEqualTo(newOpinion.getId());
        // 학생과 학생회 각각 1번, 총 2번 LastRead 저장
        verify(opinionLastReadRepository, times(2)).save(any(OpinionLastRead.class));
    }

    @Test
    @DisplayName("존재하지 않는 의견을 삭제하려 하면 예외 발생")
    void deleteOpinion_NotFound() {
        when(opinionRepository.findByIdAndIsDeletedFalse(anyLong())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> memberOpinionService.deleteOpinion(1L, 1L))
                .isInstanceOf(OpinionException.class)
                .hasMessage(ErrorCode.INVALID_OPINION.getMessage());
    }

    @Test
    @DisplayName("학생이 생성한 말해요 리스트를 조회한다.")
    void findMemberOpinionList() {
        // given
        Opinion opinion1 = NAVER_OPINION1;
        Opinion opinion2 = NAVER_OPINION2;

        List<Opinion> opinions = List.of(opinion1, opinion2);
        OpinionChat fstOpinionLastChat = NAVER_MEMBER1_OPINION1_CHAT;
        OpinionChat scdOpinionLastChat = NAVER_MEMBER2_OPINION2_CHAT;
        OpinionLastRead fstOpinionLastRead = OpinionLastRead.builder()
                .opinionId(opinion1.getId())
                .isAdmin(false)
                .lastReadChatId(NAVER_MEMBER1_OPINION1_CHAT.getId())
                .build();
        OpinionLastRead scdOpinionLastRead = OpinionLastRead.builder()
                .opinionId(opinion2.getId())
                .isAdmin(false)
                .lastReadChatId(NAVER_MEMBER2_OPINION2_CHAT.getId())
                .build();

        when(opinionRepository.findAllByMemberIdAndIsDeletedFalse(anyLong())).thenReturn(opinions);
        when(opinionLastReadRepository.findByOpinionIdInAndIsAdmin(any(), eq(false)))
                .thenReturn(List.of(fstOpinionLastRead, scdOpinionLastRead));
        when(opinionChatRepository.findLatestChatsByOpinionIds(any()))
                .thenReturn(List.of(fstOpinionLastChat, scdOpinionLastChat));

        // when
        List<MemberOpinionsInfoResponse> response = memberOpinionService.findMemberOpinionList(1L);

        // then
        assertThat(response).hasSize(2);
        assertThat(response.get(0).lastChat().content()).isEqualTo("naver chat2");
        assertThat(response.get(1).lastChat().content()).isEqualTo("naver chat1");
    }

    @Test
    @DisplayName("학생이 특정 의견을 리마인드하도록 설정한다.")
    void remindOpinion() {
        // given
        Opinion opinion = NAVER_OPINION1;
        when(opinionRepository.findByIdAndIsDeletedFalse(anyLong())).thenReturn(Optional.of(opinion));

        // when
        memberOpinionService.remindOpinion(NAVER_OPINION1.getId(), NAVER_OPINION1.getMember().getId());

        // then
        assertThat(opinion.isRemind()).isTrue();
    }

    @Test
    @DisplayName("학생이 본인의 의견이 아닐 때 리마인드를 설정하려 하면 예외 발생")
    void remindOpinion_Unauthorized() {
        Opinion opinion = NAVER_OPINION1;
        when(opinionRepository.findByIdAndIsDeletedFalse(anyLong())).thenReturn(Optional.of(opinion));

        assertThatThrownBy(() -> memberOpinionService.remindOpinion(1L, 2L))
                .isInstanceOf(OpinionException.class)
                .hasMessage(ErrorCode.UNAUTHORIZED_OPINION_ACCESS.getMessage());
    }
}
