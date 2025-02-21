package com.bungeobbang.backend.chat;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.AgendaLastReadChat;
import com.bungeobbang.backend.agenda.domain.repository.AgendaChatRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.domain.repository.MemberAgendaChatRepository;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.type.RoomType;
import com.bungeobbang.backend.chat.type.SocketEventType;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.member.domain.Member;
import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import com.bungeobbang.backend.university.domain.University;
import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.awaitility.Awaitility;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicReference;

import static com.bungeobbang.backend.common.type.CategoryType.ACADEMICS;
import static org.assertj.core.api.Assertions.assertThat;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AgendaWebSocketTest {
    private static WebSocketSession session;
    @LocalServerPort
    int port;
    CountDownLatch latch;
    AtomicReference<String> receivedMessage;
    CountDownLatch adminLatch;
    AtomicReference<String> adminReceivedMessage;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private UuidRepository uuidRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AgendaRepository agendaRepository;
    @Autowired
    private MemberAgendaChatRepository memberAgendaChatRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private JwtProvider jwtProvider;
    private Agenda CLOSED_AGENDA;
    private Agenda ACTIVE_AGENDA;
    private Agenda UPCOMING_AGENDA;
    private Member MEMBER;
    private Admin ADMIN;
    private WebSocketSession adminSession;
    @Autowired
    private AgendaChatRepository agendaChatRepository;

    @BeforeEach
    void shouldConnectToWebSocket() throws ExecutionException, InterruptedException, TimeoutException {
        agendaRepository.deleteAll();
        adminRepository.deleteAll();
        memberRepository.deleteAll();
        universityRepository.deleteAll();


        final University university = universityRepository.save(new University(null, "네이버대학교", "naver.com"));
        ADMIN = adminRepository.save(new Admin(null, "login", "password", "name", university));
        CLOSED_AGENDA = agendaRepository.save(Agenda.builder()
                .admin(ADMIN)
                .title("Naver")
                .content("Naver")
                .university(university)
                .isEnd(false)
                .startDate(LocalDate.now().minusDays(10))
                .endDate(LocalDate.now().minusDays(5))
                .categoryType(ACADEMICS)
                .images(List.of(new AgendaImage(1L, null, "image1")))
                .build());
        UPCOMING_AGENDA = agendaRepository.save(Agenda.builder()
                .admin(ADMIN)
                .title("Naver")
                .content("Naver")
                .university(university)
                .isEnd(false)
                .startDate(LocalDate.now().plusDays(10))
                .endDate(LocalDate.now().plusDays(5))
                .categoryType(ACADEMICS)
                .images(List.of(new AgendaImage(1L, null, "image1")))
                .build());
        ACTIVE_AGENDA = agendaRepository.save(Agenda.builder()
                .admin(ADMIN)
                .title("Naver")
                .content("Naver")
                .university(university)
                .isEnd(false)
                .startDate(LocalDate.now().minusDays(10))
                .endDate(LocalDate.now().plusDays(5))
                .categoryType(ACADEMICS)
                .images(List.of(new AgendaImage(1L, null, "image1")))
                .build());
        MEMBER = memberRepository.save(Member.builder().provider(ProviderType.KAKAO).email("email").loginId("1").university(university).build());
        final String uuid = UUID.randomUUID().toString();
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(String.valueOf(MEMBER.getId()), Authority.MEMBER, uuid, String.valueOf(MEMBER.getUniversity().getId()));
        uuidRepository.save(Authority.MEMBER, uuid, String.valueOf(MEMBER.getId()));
        StandardWebSocketClient client = new StandardWebSocketClient();

        if (session != null && session.isOpen()) {
            System.out.println("Reusing existing WebSocket session: " + session.getId());
            return;
        }

        String url = "ws://localhost:" + port + "/students";

        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
        headers.add("Sec-WebSocket-Protocol", memberTokens.accessToken());

        latch = new CountDownLatch(1);
        receivedMessage = new AtomicReference<>();
        WebSocketClientHandler clientHandler = new WebSocketClientHandler(latch, receivedMessage);
        session = client.execute(
                clientHandler,
                headers,
                URI.create(url)
        ).get(5, TimeUnit.SECONDS);


        assertThat(session.isOpen()).isTrue();
    }

    @Test
    @Order(1)
    @DisplayName("아직 진행 전인 답해요에 채팅을 보내면 에러 이벤트를 응답한다.")
    void testSendChatMessageAndVerifyStorage() throws Exception {
        // given
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.CHAT, null, UPCOMING_AGENDA.getId(), "웹소캣 채팅 테스트지롱",
                List.of("image1", "image2"), MEMBER.getId(), null, null, 0
        );
        String messageJson = objectMapper.writeValueAsString(payload);
        // when
        session.sendMessage(new TextMessage(messageJson));

        // then
        boolean messageReceived = latch.await(5, TimeUnit.SECONDS);
        assertThat(messageReceived).isTrue();
        final String message = receivedMessage.get();
        final MemberWebsocketMessage actual = objectMapper.readValue(message, MemberWebsocketMessage.class);
        assertThat(actual)
                .extracting("event", "message", "code")
                .containsExactly(SocketEventType.ERROR, ErrorCode.AGENDA_NOT_STARTED.getMessage(), ErrorCode.AGENDA_NOT_STARTED.getCode());
    }

    @Test
    @Order(2)
    @DisplayName("진행종료된 답해요에 채팅을 보내면 에러를 응답한다.")
    void sendChatToClosedAgenda() throws IOException, InterruptedException {
        // given
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.CHAT, null, CLOSED_AGENDA.getId(), "웹소캣 채팅 테스트지롱",
                List.of("image1", "image2"), MEMBER.getId(), null, null, 0
        );
        String messageJson = objectMapper.writeValueAsString(payload);
        // when
        session.sendMessage(new TextMessage(messageJson));
        // then
        boolean messageReceived = latch.await(5, TimeUnit.SECONDS);
        assertThat(messageReceived).isTrue();
        final String message = receivedMessage.get();
        final MemberWebsocketMessage actual = objectMapper.readValue(message, MemberWebsocketMessage.class);
        assertThat(actual)
                .extracting("event", "message", "code")
                .containsExactly(SocketEventType.ERROR, ErrorCode.AGENDA_CLOSED.getMessage(), ErrorCode.AGENDA_CLOSED.getCode());
    }

    @Test
    @Order(3)
    @DisplayName("진행 중인 답해요에 채팅을 보내면 해당 채팅을 응답받고, 채팅이 저장된다.")
    void sendChatToActiveAgenda() throws Exception {
        // given
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.CHAT, null, ACTIVE_AGENDA.getId(), "웹소캣 채팅 테스트지롱",
                List.of("image1", "image2"), MEMBER.getId(), null, null, 0
        );
        String messageJson = objectMapper.writeValueAsString(payload);
        // when
        session.sendMessage(new TextMessage(messageJson));
        //then
        boolean messageReceived = latch.await(5, TimeUnit.SECONDS);
        assertThat(messageReceived).isTrue();
        final String message = receivedMessage.get();
        final MemberWebsocketMessage actual = objectMapper.readValue(message, MemberWebsocketMessage.class);
        assertThat(actual)
                .extracting("event", "message", "code")
                .containsExactly(SocketEventType.CHAT, payload.message(), 0);
        Awaitility.await()
                .atMost(5, TimeUnit.SECONDS)
                .pollInterval(200, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    AgendaChat lastChat = memberAgendaChatRepository.findLastChat(ACTIVE_AGENDA.getId(), MEMBER.getId());
                    Assertions.assertThat(lastChat)
                            .isNotNull()
                            .extracting("chat")
                            .isEqualTo(payload.message());
                });
    }

    @Test
    @Order(4)
    @DisplayName("채팅에 입장하면 해당 채팅방의 마지막 읽은 채팅이 MAX값으로 설정된다.")
    void enterAgenda() throws Exception {
        // given
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.ENTER, null, ACTIVE_AGENDA.getId(), null,
                null, MEMBER.getId(), null, null, 0
        );
        String messageJson = objectMapper.writeValueAsString(payload);
        // when
        session.sendMessage(new TextMessage(messageJson));

        //then
        boolean messageReceived = latch.await(5, TimeUnit.SECONDS);
        assertThat(messageReceived).isFalse();
        final Query query = new Query().addCriteria(
                Criteria.where("memberId").is(MEMBER.getId())
                        .and("agendaId").is(ACTIVE_AGENDA.getId()));
        Awaitility.await()
                .atMost(5, TimeUnit.SECONDS)
                .pollInterval(200, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    final AgendaLastReadChat lastReadChat = mongoTemplate.findOne(query, AgendaLastReadChat.class);
                    Assertions.assertThat(lastReadChat)
                            .isNotNull()
                            .extracting("lastReadChatId")
                            .isEqualTo(new ObjectId("ffffffffffffffffffffffff"));
                });
    }

    @Test
    @Order(5)
    @DisplayName("답해요 채팅방 화면에서 이탈하면 마지막 읽은 채팅이 갱신된다.")
    void exitAgenda() throws Exception {
        // given
        agendaChatRepository.save(new AgendaChat(null, ACTIVE_AGENDA.getId(), "마지막 채팅", List.of(), true, null, LocalDateTime.now()));
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.LEAVE, null, ACTIVE_AGENDA.getId(), null,
                null, MEMBER.getId(), null, null, 0
        );
        String messageJson = objectMapper.writeValueAsString(payload);
        // when
        session.sendMessage(new TextMessage(messageJson));
        //then
        Awaitility.await()
                .atMost(5, TimeUnit.SECONDS)
                .pollInterval(200, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    final Query query = new Query().addCriteria(
                            Criteria.where("memberId").is(MEMBER.getId())
                                    .and("agendaId").is(ACTIVE_AGENDA.getId()));
                    final AgendaChat lastChat = memberAgendaChatRepository.findLastChat(ACTIVE_AGENDA.getId(), MEMBER.getId());
                    final AgendaLastReadChat lastReadChat = mongoTemplate.findOne(query, AgendaLastReadChat.class);
                    Assertions.assertThat(lastReadChat)
                            .isNotNull()
                            .extracting("lastReadChatId")
                            .isEqualTo(lastChat.getId());
                });

    }

    @Test
    @Order(6)
    @DisplayName("답해요 참가 후 학생회의 메시지를 수신할 수 있다.")
    void participateAndReceiveChat() throws Exception {
        // given
        MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.PARTICIPATE, null, ACTIVE_AGENDA.getId(), null,
                null, MEMBER.getId(), null, null, 0
        );
        String memberWebsocketEvent = objectMapper.writeValueAsString(payload);
        final String uuid = UUID.randomUUID().toString();
        final MemberTokens adminTokens = jwtProvider.generateLoginToken(String.valueOf(ADMIN.getId()), Authority.ADMIN, uuid, String.valueOf(MEMBER.getUniversity().getId()));
        uuidRepository.save(Authority.ADMIN, uuid, String.valueOf(ADMIN.getId()));

        StandardWebSocketClient client = new StandardWebSocketClient();
        String url = "ws://localhost:" + port + "/admins";

        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
        headers.add("Sec-WebSocket-Protocol", adminTokens.accessToken());

        adminLatch = new CountDownLatch(1);
        adminReceivedMessage = new AtomicReference<>();
        AdminWebSocketClientHandler clientHandler = new AdminWebSocketClientHandler(adminLatch, adminReceivedMessage);
        adminSession = client.execute(
                clientHandler,
                headers,
                URI.create(url)
        ).get(5, TimeUnit.SECONDS);
        AdminWebsocketMessage adminWebsocketMessage = new AdminWebsocketMessage(RoomType.AGENDA, SocketEventType.CHAT, null, ACTIVE_AGENDA.getId(), "학생회입니다~",
                List.of("image1", "image2"), ADMIN.getId(), null, null, 0
        );

        String adminMessage = objectMapper.writeValueAsString(adminWebsocketMessage);

        // when
        session.sendMessage(new TextMessage(memberWebsocketEvent));
        //then
        boolean messageReceived = latch.await(5, TimeUnit.SECONDS);
        assertThat(messageReceived).isFalse();
        assertThat(adminSession.isOpen()).isTrue();

        // when
        adminSession.sendMessage(new TextMessage(adminMessage));
        //then
        adminLatch.await(5, TimeUnit.SECONDS);
        latch.await(5, TimeUnit.SECONDS);
        final String received = receivedMessage.get();
        final AdminWebsocketMessage heard = objectMapper.readValue(received, AdminWebsocketMessage.class);
        assertThat(heard).isNotNull()
                .extracting("message")
                .isEqualTo(adminWebsocketMessage.message());
    }

    @AfterEach
    void teardown() throws Exception {
        if (session != null && session.isOpen()) {
            session.close();
        }
    }

    public class WebSocketClientHandler extends TextWebSocketHandler {
        private final CountDownLatch latch;
        private final AtomicReference<String> receivedMessage;

        public WebSocketClientHandler(CountDownLatch latch, AtomicReference<String> receivedMessage) {
            this.latch = latch;
            this.receivedMessage = receivedMessage;
        }

        @Override
        protected void handleTextMessage(WebSocketSession session, TextMessage message) {
            receivedMessage.set(message.getPayload()); // 응답 메시지 저장
            System.out.println("학생한테 들어오긴하나,,,");
            latch.countDown(); // 응답을 받았으므로 countDown()
        }

        @Override
        public void afterConnectionEstablished(WebSocketSession session) {
            System.out.println("✅ WebSocket 연결 성공: " + session.getId());
        }
    }

    public class AdminWebSocketClientHandler extends TextWebSocketHandler {
        private final CountDownLatch latch;
        private final AtomicReference<String> receivedMessage;

        public AdminWebSocketClientHandler(CountDownLatch latch, AtomicReference<String> receivedMessage) {
            this.latch = latch;
            this.receivedMessage = receivedMessage;
        }

        @Override
        protected void handleTextMessage(WebSocketSession session, TextMessage message) {
            receivedMessage.set(message.getPayload()); // 응답 메시지 저장
            System.out.println("🆕들어오긴하나,,,");
            latch.countDown(); // 응답을 받았으므로 countDown()
        }

        @Override
        public void afterConnectionEstablished(WebSocketSession session) {
            System.out.println("✅ WebSocket 연결 성공: " + session.getId());
        }
    }


}
