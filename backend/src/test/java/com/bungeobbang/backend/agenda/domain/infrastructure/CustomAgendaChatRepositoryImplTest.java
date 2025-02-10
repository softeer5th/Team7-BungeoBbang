package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaLastReadChat;
import com.bungeobbang.backend.agenda.dto.response.AgendaLatestChat;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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

import static org.assertj.core.api.Assertions.assertThat;


@DataMongoTest()
@Import(CustomAgendaChatRepositoryImpl.class)
class CustomAgendaChatRepositoryImplTest {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private CustomAgendaChatRepositoryImpl customAgendaChatRepository;

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
    @DisplayName("채팅방의 마지막 채팅을 조회한다. 학생의 마지막 채팅은 자신의 채팅이거나 학생회의 채팅이다.")
    void findLastChatForMember() {

        final AgendaChat lastChat = customAgendaChatRepository.findLastChatForMember(1L, 30L);
        assertThat(lastChat).isNotNull();
        assertThat(lastChat.getChat()).isEqualTo("학생30 채팅");
    }

    @Test
    @DisplayName("학생회 채팅, 자신이 전송한 채팅이 없는 경우 마지막 채팅이 존재하지 않는다.")
    void findLastChats_sendNoChatForMember() {
        final List<AgendaLatestChat> lastChats =
                customAgendaChatRepository.findLastChats(List.of(1L, 2L), 1L);

        assertThat(lastChats).size().isEqualTo(0);
    }

    @Test
    @DisplayName("여러 개의 채팅방에서 마지막 채팅을 조회한다.")
    void findLastChatsForMember() {
        final List<AgendaLatestChat> lastChats =
                customAgendaChatRepository.findLastChats(List.of(1L, 2L), 31L);

        assertThat(lastChats).size().isEqualTo(2);
        final List<Long> list = lastChats.stream().map(AgendaLatestChat::agendaId).toList();
        assertThat(list).containsExactlyInAnyOrder(1L, 2L);
    }

    @Test
    @DisplayName("마지막 읽은 채팅을 upsert하면 기존 데이터를 갱신한다.")
    void upsertLastReadChat() {
        // given
        mongoTemplate.insert(new AgendaLastReadChat(null, 1L, 1L, new ObjectId(0, 0)));
        // when
        customAgendaChatRepository.upsertLastReadChat(1L, 1L, new ObjectId(1, 1));

        // then
        Query query = new Query().addCriteria(
                Criteria.where("memberId").is(1L)
                        .and("agendaId").is(1L)
        );
        List<AgendaLastReadChat> actual = mongoTemplate.find(query, AgendaLastReadChat.class);
        assertThat(actual).size().isEqualTo(1);
        assertThat(actual.get(0).getLastReadChatId()).isEqualTo(new ObjectId(1, 1));
    }

}
