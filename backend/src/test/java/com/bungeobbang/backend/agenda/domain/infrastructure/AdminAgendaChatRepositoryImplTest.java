package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.AgendaAdminLastReadChat;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.repository.AdminLastReadChatRepository;
import com.bungeobbang.backend.agenda.dto.AdminAgendaSubResult;
import com.bungeobbang.backend.common.type.ScrollType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@DataMongoTest()
@Import(AdminAgendaChatRepositoryImpl.class)
class AdminAgendaChatRepositoryImplTest {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private AdminAgendaChatRepositoryImpl adminAgendaChatRepository;
    @Autowired
    private AdminLastReadChatRepository adminLastReadChatRepository;

    @BeforeEach
    void setUp() throws IOException {
        mongoTemplate.dropCollection("agenda_chat");
        mongoTemplate.dropCollection("agenda_last_read_chat");
        File file = new File("src/test/resources/data/agenda_chat.json");
        List<AgendaChat> agendaChatList = objectMapper.readValue(file, new TypeReference<>() {
        });

        mongoTemplate.insertAll(agendaChatList);
    }

    @Test
    @DisplayName("마지막 채팅을 조회한다.")
    void findLastChat() {
        // when
        final AgendaChat lastChat = adminAgendaChatRepository.findLastChat(1L);
        /*
           {
    "agendaId": 1,
    "images": [
      "www.naver.com"
    ],
    "memberId": 31,
    "chat": "학생31 채팅"
  }
         */
        // then
        Assertions.assertThat(lastChat)
                .isNotNull()
                .extracting("agendaId", "chat", "memberId", "isAdmin", "images")
                .containsExactly(1L, "학생31 채팅", 31L, false, List.of("www.naver.com"));

    }

    @Test
    @DisplayName("마지막 읽은 채팅을 업데이트한다.")
    void upsertAdminLastReadChat() {
        //given

        final ObjectId max = new ObjectId("ffffffffffffffffffffffff");
        // when
        adminAgendaChatRepository.upsertAdminLastReadChat(1L, 1L, max);

        // then
        Query query = new Query();
        query.addCriteria(Criteria.where("agendaId").is(1).and("adminId").is(1));
        final AgendaAdminLastReadChat lastReadChat = mongoTemplate.findOne(query, AgendaAdminLastReadChat.class);

        Assertions.assertThat(lastReadChat)
                .isNotNull()
                .extracting("agendaId", "adminId", "lastReadChatId")
                .containsExactly(1L, 1L, max);
    }

    @Nested
    class scrollTest {
        @BeforeEach
        void setUp() throws IOException {
            mongoTemplate.dropCollection("agenda_chat");
            mongoTemplate.dropCollection("agenda_last_read_chat");
            File file = new File("src/test/resources/data/agenda_chat_scroll.json");
            List<AgendaChat> agendaChatList = objectMapper.readValue(file, new TypeReference<>() {
            });

            mongoTemplate.insertAll(agendaChatList);
        }

        @Test
        @DisplayName("첫 스크롤은 마지막 읽은 채팅을 포함한다.")
        void findChatsByScroll() {
            // given
            ObjectId lastReadChatId = new ObjectId("000000000000000000000001");
            // when
            final List<AgendaChat> chatsByScroll = adminAgendaChatRepository.findChatsByScroll(1L, lastReadChatId, ScrollType.INITIAL);

            // then
            Assertions.assertThat(chatsByScroll)
                    .hasSize(10)
                    .extracting("chat")
                    .containsExactly("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
        }

        @Test
        @DisplayName("up 스크롤은 채팅 위로 10개를 조회한다.")
        void findChatsByScroll_UP() {
            // given
            ObjectId lastReadChatId = new ObjectId("000000000000000000000012");
            // when
            final List<AgendaChat> chatsByScroll = adminAgendaChatRepository.findChatsByScroll(1L, lastReadChatId, ScrollType.UP);

            // then
            Assertions.assertThat(chatsByScroll)
                    .hasSize(10)
                    .extracting("chat")
                    .containsExactly("8", "9", "10", "11", "12", "13", "14", "15", "16", "17");
        }

        @Test
        @DisplayName("down 스크롤은 채팅 아래로 10개를 조회한다.")
        void findChatsByScroll_DOWN() {
            // given
            ObjectId lastReadChatId = new ObjectId("000000000000000000000004");
            // when
            final List<AgendaChat> chatsByScroll = adminAgendaChatRepository.findChatsByScroll(1L, lastReadChatId, ScrollType.DOWN);

            // then
            Assertions.assertThat(chatsByScroll)
                    .hasSize(10)
                    .extracting("chat")
                    .containsExactly("5", "6", "7", "8", "9", "10", "11", "12", "13", "14");
        }

        @Test
        @DisplayName("chatId가 max값일 경우 최신 채팅 10개를 조회한다.")
        void findChatsByScroll_MAX() {
            // given
            ObjectId lastReadChatId = new ObjectId("ffffffffffffffffffffffff");
            // when
            final List<AgendaChat> chatsByScroll = adminAgendaChatRepository.findChatsByScroll(1L, lastReadChatId, ScrollType.INITIAL);

            // then
            Assertions.assertThat(chatsByScroll)
                    .hasSize(10)
                    .extracting("chat")
                    .containsExactly("11", "12", "13", "14", "15", "16", "17", "18", "19", "20");
        }

        @Test
        @DisplayName("읽음 여부를 조회한다.")
        void findUnreadStatus() {
            // given
            adminLastReadChatRepository.save(new AgendaAdminLastReadChat(null, 1L, 1L, new ObjectId("000000000000000000000005")));
            // when
            final Map<Long, AdminAgendaSubResult> unreadStatus = adminAgendaChatRepository.findUnreadStatus(List.of(1L), 1L);

            // then
            Assertions.assertThat(unreadStatus)
                    .hasSize(1);
            Assertions.assertThat(unreadStatus.get(1L).hasNewMessage()).isTrue();

        }

    }


}