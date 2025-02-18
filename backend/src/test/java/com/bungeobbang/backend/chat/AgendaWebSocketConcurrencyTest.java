package com.bungeobbang.backend.chat;

import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.type.RoomType;
import com.bungeobbang.backend.chat.type.SocketEventType;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.web.socket.*;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "/data/member.sql")
public class AgendaWebSocketConcurrencyTest {
    private static WebSocketSession session;
    private final Long ACTIVE_AGENDA_ID = 1L;
    private final int memberCount = 100;
    @LocalServerPort
    int port;
    CountDownLatch latch;
    AtomicInteger receivedMessages;
    Map<Long, WebSocketSession> sessions = new ConcurrentHashMap<>();
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UuidRepository uuidRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @BeforeEach
    void connectMember() throws ExecutionException, InterruptedException, TimeoutException {
        for (int i = 1; i <= memberCount; i++) {
            final String uuid = UUID.randomUUID().toString();
            final MemberTokens memberTokens = jwtProvider.generateLoginToken(String.valueOf(i), Authority.MEMBER, uuid);
            uuidRepository.save(Authority.MEMBER, uuid, String.valueOf(i));
            StandardWebSocketClient client = new StandardWebSocketClient();
            String url = "ws://localhost:" + port + "/students";

            WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
            headers.add("Sec-WebSocket-Protocol", memberTokens.accessToken());
            final WebSocketSession webSocketSession = client.execute(
                    new WebSocketHandler() {
                        @Override
                        public void afterConnectionEstablished(WebSocketSession session) {

                        }

                        @Override
                        public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

                        }

                        @Override
                        public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

                        }

                        @Override
                        public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

                        }

                        @Override
                        public boolean supportsPartialMessages() {
                            return false;
                        }
                    },
                    headers,
                    URI.create(url)
            ).get(5, TimeUnit.SECONDS);
            sessions.put((long) i, webSocketSession);
        }
        Assertions.assertThat(sessions).hasSize(memberCount);
    }

    @Test
    @DisplayName("학생이 동시에 n개의 메세지를 보내면 학생회는 n개 모두 수신받아야한다.")
    void sendChats() throws Exception {
        // given
        StandardWebSocketClient client = new StandardWebSocketClient();
        String url = "ws://localhost:" + port + "/admins";
        final String uuid = UUID.randomUUID().toString();
        final MemberTokens memberTokens = jwtProvider.generateLoginToken(String.valueOf(1), Authority.ADMIN, uuid);
        uuidRepository.save(Authority.ADMIN, uuid, String.valueOf(1));
        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
        headers.add("Sec-WebSocket-Protocol", memberTokens.accessToken());

        ExecutorService executorService = Executors.newFixedThreadPool(memberCount);
        latch = new CountDownLatch(memberCount);
        receivedMessages = new AtomicInteger(0);
        WebSocketClientHandler clientHandler = new WebSocketClientHandler(latch, receivedMessages);
        session = client.execute(
                clientHandler,
                headers,
                URI.create(url)
        ).get(5, TimeUnit.SECONDS);
        assertThat(session.isOpen()).isTrue();

        // when
        for (int i = 1; i <= memberCount; i++) {
            long memberId = i;
            executorService.execute(() -> {
                try {

                    MemberWebsocketMessage payload = new MemberWebsocketMessage(RoomType.AGENDA, SocketEventType.CHAT, null, ACTIVE_AGENDA_ID, "채팅",
                            null, memberId, null, 0
                    );
                    String messageJson = objectMapper.writeValueAsString(payload);
                    sessions.get(memberId).sendMessage(new TextMessage(messageJson));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
        executorService.shutdown();
        executorService.awaitTermination(10, TimeUnit.SECONDS);

        // then
        boolean completed = latch.await(10, TimeUnit.SECONDS);
        assertThat(receivedMessages.get()).isEqualTo(memberCount);
    }

    @AfterEach
    void teardown() throws Exception {
        if (session != null && session.isOpen()) {
            session.close();
        }
    }

    public class WebSocketClientHandler extends TextWebSocketHandler {
        private final CountDownLatch latch;
        private final AtomicInteger receivedMessage;

        public WebSocketClientHandler(CountDownLatch latch, AtomicInteger receivedMessage) {
            this.latch = latch;
            this.receivedMessage = receivedMessage;
        }

        @Override
        protected void handleTextMessage(WebSocketSession session, TextMessage message) {
            receivedMessage.incrementAndGet();
            latch.countDown();
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
            latch.countDown(); // 응답을 받았으므로 countDown()
        }

        @Override
        public void afterConnectionEstablished(WebSocketSession session) {
            System.out.println("✅ WebSocket 연결 성공: " + session.getId());
        }
    }
}
