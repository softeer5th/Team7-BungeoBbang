package com.bungeobbang.backend.chat.handler;


import com.bungeobbang.backend.auth.Claim;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.chat.event.agenda.AgendaAdminEvent;
import com.bungeobbang.backend.chat.event.common.AdminConnectEvent;
import com.bungeobbang.backend.chat.event.common.AdminDisconnectEvent;
import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.event.opinion.OpinionAdminEvent;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.BadWordException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

import static com.bungeobbang.backend.chat.type.SocketEventType.ERROR;
import static com.bungeobbang.backend.chat.type.SocketEventType.PING;
import static com.bungeobbang.backend.common.exception.ErrorCode.DUPLICATE_LOGIN;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_UUID;

@Component
@Log4j2
@RequiredArgsConstructor
public class AdminWebSocketChatHandler extends TextWebSocketHandler {
    private static final String ACCESS_TOKEN = "accessToken";
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher publisher;
    private final UuidRepository uuidRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        final Long adminId = Long.valueOf(jwtProvider.getSubject(accessToken));
        publisher.publishEvent(new AdminConnectEvent(session, adminId));

        super.afterConnectionEstablished(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        try {
            log.info("📚Received text message from admin: {}", message.getPayload());
            // accessToken 검증
            validateAccessToken(accessToken);

            final AdminWebsocketMessage request = objectMapper.readValue(message.getPayload(), AdminWebsocketMessage.class);
            if (request.event().equals(PING)) {
                session.sendMessage(new TextMessage("PONG"));
                return;
            }
            final Long universityId = Long.valueOf(jwtProvider.getClaim(accessToken, Claim.UNIVERSITY));
            // createdAt 생성하여 requestContainsCreatedAt 객체 생성
            final AdminWebsocketMessage requestContainsCreatedAt = AdminWebsocketMessage.createResponse(request, universityId);


            switch (request.roomType()) {
                case AGENDA -> publisher.publishEvent(AgendaAdminEvent.from(session, requestContainsCreatedAt));
                case OPINION -> publisher.publishEvent(OpinionAdminEvent.from(session, requestContainsCreatedAt));
            }
        } catch (AuthException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage(), e.getCode()))));
            session.close();
        } catch (BadWordException | AgendaException | OpinionException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage(), e.getCode()))));
        } catch (Exception e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage(), -1))));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        final Long adminId = Long.valueOf(jwtProvider.getSubject(accessToken));
        publisher.publishEvent(new AdminDisconnectEvent(session, adminId));
        super.afterConnectionClosed(session, status);
    }

    private void validateAccessToken(String accessToken) {
        jwtProvider.validateToken(accessToken);
        final String actual = jwtProvider.getClaim(accessToken, Claim.UUID);
        final String adminId = jwtProvider.getSubject(accessToken);

        final Authority authority = Authority.valueOf(jwtProvider.getClaim(accessToken, Claim.ROLE));
        final String expected = uuidRepository.get(authority, adminId)
                .orElseThrow(() -> new AuthException(INVALID_UUID));
        validateUuid(actual, expected);
    }


    private void validateUuid(String actual, String expected) {
        if (!actual.equals(expected)) {
            throw new AuthException(DUPLICATE_LOGIN);
        }
    }
}
