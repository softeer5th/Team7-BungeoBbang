package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.common.type.CategoryType;
import com.bungeobbang.backend.opinion.domain.Opinion;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.OpinionChatRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.bungeobbang.backend.opinion.dto.response.AdminOpinionsInfoResponse;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.bungeobbang.backend.admin.fixture.AdminFixture.NAVER_ADMIN;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_ADMIN;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminOpinionServiceTest {
    @InjectMocks
    private AdminOpinionService adminOpinionService;
    @Mock
    private OpinionRepository opinionRepository;
    @Mock
    private OpinionChatRepository opinionChatRepository;
    @Mock
    private OpinionLastReadRepository opinionLastReadRepository;
    @Mock
    private AdminRepository adminRepository;

    @Test
    @DisplayName("학생회가 특정 카테고리의 의견 목록을 조회한다.")
    void findAdminOpinionList() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findById(anyLong())).thenReturn(Optional.of(admin));

        Opinion opinion1 = new Opinion(1L, admin.getUniversity(), null, CategoryType.IT, null, false);
        Opinion opinion2 = new Opinion(2L, admin.getUniversity(), null, CategoryType.EVENTS, null, false);
        when(opinionRepository.findAllByCategoryTypeInAndUniversityId(Set.of(CategoryType.IT), admin.getUniversity().getId()))
                .thenReturn(List.of(opinion1));

        // Mock 데이터 설정 (마지막 읽은 채팅 및 최신 채팅)
        OpinionLastRead lastRead = new OpinionLastRead(new ObjectId(), opinion1.getId(), true, new ObjectId("000000000000000000000001"));
        OpinionChat lastChat = OpinionChat.builder()
                .id(new ObjectId())
                .opinionId(opinion1.getId())
                .chat("최신 메시지")
                .build();

        when(opinionLastReadRepository.findByOpinionIdInAndIsAdmin(List.of(opinion1.getId()), true))
                .thenReturn(List.of(lastRead));
        when(opinionChatRepository.findLatestChatsByOpinionIds(List.of(opinion1.getId())))
                .thenReturn(List.of(lastChat));

        // when
        List<AdminOpinionsInfoResponse> responses = adminOpinionService.findAdminOpinionList(Set.of(CategoryType.IT), admin.getId());

        // then
        assertThat(responses).hasSize(1);
        assertThat(responses.get(0).opinion().id()).isEqualTo(opinion1.getId());
    }

    @Test
    @DisplayName("학생회가 전체 의견 목록을 조회한다.")
    void findAdminOpinionList_allCategories() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findById(anyLong())).thenReturn(Optional.of(admin));

        Opinion opinion1 = new Opinion(1L, admin.getUniversity(), null, CategoryType.IT, null, false);
        Opinion opinion2 = new Opinion(2L, admin.getUniversity(), null, CategoryType.EVENTS, null, true);
        when(opinionRepository.findAllByCategoryTypeInAndUniversityId(Set.of(CategoryType.IT), admin.getUniversity().getId()))
                .thenReturn(List.of(opinion1, opinion2));

        OpinionLastRead lastRead1 = new OpinionLastRead(new ObjectId(), opinion1.getId(), true, new ObjectId("000000000000000000000000"));
        OpinionLastRead lastRead2 = new OpinionLastRead(new ObjectId(), opinion2.getId(), true, new ObjectId("000000000000000000000000"));
        OpinionChat lastChat1 = OpinionChat.builder()
                .id(new ObjectId())
                .opinionId(opinion1.getId())
                .chat("메시지1")
                .build();

        OpinionChat lastChat2 = OpinionChat.builder()
                .id(new ObjectId())
                .opinionId(opinion2.getId())
                .chat("메시지2")
                .build();

        when(opinionLastReadRepository.findByOpinionIdInAndIsAdmin(List.of(opinion1.getId(), opinion2.getId()), true))
                .thenReturn(List.of(lastRead1, lastRead2));
        when(opinionChatRepository.findLatestChatsByOpinionIds(List.of(opinion1.getId(), opinion2.getId())))
                .thenReturn(List.of(lastChat1, lastChat2));

        // when
        List<AdminOpinionsInfoResponse> responses = adminOpinionService.findAdminOpinionList(Set.of(CategoryType.IT), admin.getId());

        // then
        assertThat(responses).hasSize(2);
        // isRemind == true 인 opinion2 먼저 반환
        assertThat(responses.get(0).opinion().id()).isEqualTo(opinion2.getId());
        assertThat(responses.get(1).opinion().id()).isEqualTo(opinion1.getId());
    }

    @Test
    @DisplayName("존재하지 않는 학생회가 요청하면 예외가 발생한다.")
    void findAdminOpinionList_invalidAdmin() {
        // given
        when(adminRepository.findById(anyLong())).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> adminOpinionService.findAdminOpinionList(Set.of(CategoryType.IT), 999L))
                .isInstanceOf(AdminException.class)
                .hasMessage(INVALID_ADMIN.getMessage());
    }

    @Test
    @DisplayName("학생회의 말해요 채팅방 목록을 조회할 때 마지막 읽은 채팅이 없으면 기본값을 저장한다.")
    void findAdminOpinionList_noLastRead() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findById(anyLong())).thenReturn(Optional.of(admin));

        Opinion opinion = new Opinion(1L, admin.getUniversity(), null, CategoryType.IT, null, false);
        OpinionChat lastChat = OpinionChat.builder()
                .id(new ObjectId())
                .opinionId(1L)
                .chat("최신 메시지")
                .build();

        OpinionLastRead defaultLastRead = OpinionLastRead.builder()
                .opinionId(opinion.getId())
                .isAdmin(true)
                .lastReadChatId(new ObjectId("000000000000000000000000"))
                .build();

        when(opinionRepository.findAllByUniversityId(admin.getUniversity().getId()))
                .thenReturn(List.of(opinion));
        when(opinionLastReadRepository.findByOpinionIdInAndIsAdmin(List.of(1L), true))
                .thenReturn(List.of());
        when(opinionChatRepository.findLatestChatsByOpinionIds(List.of(1L)))
                .thenReturn(List.of(lastChat));

        // save() -> lastRead를 반환
        when(opinionLastReadRepository.save(any(OpinionLastRead.class)))
                .thenReturn(defaultLastRead);

        // when
        List<AdminOpinionsInfoResponse> responses = adminOpinionService.findAdminOpinionList(null, admin.getId());

        // then
        assertThat(responses).hasSize(1);
        assertThat(responses.get(0).opinion().id()).isEqualTo(1L);
        verify(opinionLastReadRepository).save(any(OpinionLastRead.class));
    }

    @Test
    @DisplayName("학생회의 말해요 채팅방 목록을 조회할 때 채팅이 아무것도 없는 경우 예외 발생")
    void findAdminOpinionList_noChats() {
        // given
        Admin admin = NAVER_ADMIN;
        when(adminRepository.findById(anyLong())).thenReturn(Optional.of(admin));

        Opinion opinion = new Opinion(1L, admin.getUniversity(), null, CategoryType.IT, null, false);

        when(opinionRepository.findAllByUniversityId(admin.getUniversity().getId()))
                .thenReturn(List.of(opinion));
        when(opinionChatRepository.findLatestChatsByOpinionIds(List.of(1L)))
                .thenReturn(List.of());

        // when & then
        assertThatThrownBy(() -> adminOpinionService.findAdminOpinionList(null, admin.getId()))
                .isInstanceOf(OpinionException.class)
                .hasMessage(ErrorCode.INVALID_OPINION_CHAT.getMessage());
    }


}
