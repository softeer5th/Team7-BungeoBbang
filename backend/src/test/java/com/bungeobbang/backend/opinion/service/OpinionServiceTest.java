package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.OpinionType;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.response.OpinionChatResponse;
import com.bungeobbang.backend.opinion.dto.response.OpinionDetailResponse;
import com.bungeobbang.backend.university.domain.University;
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
import static com.bungeobbang.backend.university.UniversityFixture.NAVER_UNIVERSITY;
import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OpinionServiceTest {
    @InjectMocks
    private OpinionService opinionService;
    @Mock
    private OpinionChatRepository opinionChatRepository;
    @Mock
    private OpinionRepository opinionRepository;
    @Mock
    private OpinionLastReadRepository opinionLastReadRepository;

    @Test
    @DisplayName("말해요 채팅 내역 조회 - 정상 조회")
    void findOpinionChat() {
        // given
        Long opinionId = 1L;
        Long userId = 1L;
        ObjectId lastChatId = new ObjectId();
        OpinionChat chat = OpinionChat.builder()
                .id(new ObjectId())
                .memberId(1L)
                .chat("테스트 채팅")
                .images(emptyList())
                .build();

        when(opinionChatRepository.findByOpinionIdAndLastChatId(anyLong(), any(ObjectId.class)))
                .thenReturn(List.of(chat));

        // when
        List<OpinionChatResponse> result = opinionService.findOpinionChat(opinionId, lastChatId, userId, null);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).chat()).isEqualTo("테스트 채팅");
    }

    @Test
    @DisplayName("말해요 정보 조회 - 정상 조회")
    void findOpinionDetail() {
        // given
        University university = NAVER_UNIVERSITY;
        Member member = NAVER_MEMBER;
        Opinion opinion = Opinion.builder()
                .id(1L)
                .university(university)
                .opinionType(OpinionType.NEED)
                .categoryType(CategoryType.IT)
                .isRemind(true)
                .member(member)
                .build();

        when(opinionRepository.findByIdAndIsDeletedFalse(anyLong())).thenReturn(Optional.of(opinion));

        // when
        OpinionDetailResponse result = opinionService.findOpinionDetail(1L);

        // then
        assertThat(result.universityName()).isEqualTo("네이버대학교");
        assertThat(result.isReminded()).isTrue();
    }

    @Test
    @DisplayName("존재하지 않는 말해요 정보 조회 시 예외 발생")
    void findOpinionDetail_notFound() {
        // given
        when(opinionRepository.findByIdAndIsDeletedFalse(anyLong())).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> opinionService.findOpinionDetail(100L))
                .isInstanceOf(OpinionException.class)
                .hasMessage(ErrorCode.INVALID_OPINION.getMessage());
    }

    @Test
    @DisplayName("마지막 읽은 채팅 ID를 최대값으로 업데이트")
    void updateLastReadToMax() {
        // given
        OpinionLastRead lastRead = new OpinionLastRead(new ObjectId(), 1L, false, new ObjectId());

        when(opinionLastReadRepository.findByOpinionIdAndIsAdmin(anyLong(), anyBoolean()))
                .thenReturn(Optional.of(lastRead));

        // when
        opinionService.updateLastReadToMax(1L, false);

        // then
        assertThat(lastRead.getLastReadChatId().toHexString()).isEqualTo("ffffffffffffffffffffffff");
        verify(opinionLastReadRepository).save(lastRead);
    }

    @Test
    @DisplayName("마지막 읽은 채팅 ID 업데이트 - 최신 채팅 적용")
    void updateLastReadToLastChatId() {
        // given
        Long opinionId = 1L;
        boolean isAdmin = false;
        OpinionLastRead lastRead = new OpinionLastRead(new ObjectId(), opinionId, isAdmin, null);
        OpinionChat lastChat = new OpinionChat(new ObjectId(), 1L, opinionId, "최신 채팅", emptyList(), false, LocalDateTime.now());

        when(opinionLastReadRepository.findByOpinionIdAndIsAdmin(anyLong(), anyBoolean()))
                .thenReturn(Optional.of(lastRead));
        when(opinionChatRepository.findTop1ByOpinionIdOrderByIdDesc(anyLong()))
                .thenReturn(Optional.of(lastChat));

        // when
        opinionService.updateLastReadToLastChatId(opinionId, isAdmin);

        // then
        assertThat(lastRead.getLastReadChatId()).isEqualTo(lastChat.getId());
        // ~repository save 메서드가 한 번 호출되었는 지 검증
        verify(opinionLastReadRepository).save(lastRead);
    }

    @Test
    @DisplayName("마지막 읽은 채팅 ID 업데이트 - 채팅이 없을 경우 예외 발생")
    void updateLastReadToLastChatId_noChat() {
        // given
        Long opinionId = 1L;
        boolean isAdmin = false;
        OpinionLastRead lastRead = new OpinionLastRead(new ObjectId(), opinionId, isAdmin, new ObjectId());

        when(opinionLastReadRepository.findByOpinionIdAndIsAdmin(anyLong(), anyBoolean()))
                .thenReturn(Optional.of(lastRead));
        when(opinionChatRepository.findTop1ByOpinionIdOrderByIdDesc(anyLong()))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> opinionService.updateLastReadToLastChatId(opinionId, isAdmin))
                .isInstanceOf(OpinionException.class)
                .hasMessage(ErrorCode.INVALID_OPINION_CHAT.getMessage());
    }

    @Test
    @DisplayName("새로운 채팅 저장")
    void saveChat() {
        // given
        Long userId = 1L;
        Long opinionId = 1L;
        String chat = "새로운 채팅입니다.";
        List<String> images = emptyList();
        boolean isAdmin = false;
        LocalDateTime createdAt = LocalDateTime.now();

        // when
        opinionService.saveChat(userId, opinionId, chat, images, isAdmin, createdAt);

        // then
        // OpinionChat 객체를 전달하는 ~~repository의 save 메서드가 1번 호출되었는 지 검증
        verify(opinionChatRepository).save(any(OpinionChat.class));
    }
}
