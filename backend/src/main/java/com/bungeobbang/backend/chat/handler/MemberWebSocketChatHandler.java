package com.bungeobbang.backend.chat.handler;


import com.bungeobbang.backend.auth.Claim;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.auth.domain.repository.UuidRepository;
import com.bungeobbang.backend.chat.event.agenda.AgendaMemberEvent;
import com.bungeobbang.backend.chat.event.common.MemberConnectEvent;
import com.bungeobbang.backend.chat.event.common.MemberDisconnectEvent;
import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.event.opinion.OpinionMemberEvent;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.BadWordException;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberWebSocketChatHandler extends TextWebSocketHandler {
    private static final String ACCESS_TOKEN = "accessToken";
    private final JwtProvider jwtProvider;
    private final UuidRepository uuidRepository;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher publisher;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        final Long memberId = Long.valueOf(jwtProvider.getSubject(accessToken));
        publisher.publishEvent(new MemberConnectEvent(session, memberId));

        super.afterConnectionEstablished(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        try {
            log.info("Received text message from member: {}", message.getPayload());
            // accessToken 검증
            validateAccessToken(accessToken);

            final MemberWebsocketMessage request = objectMapper.readValue(message.getPayload(), MemberWebsocketMessage.class);
            if (request.event().equals(PING)) {
                session.sendMessage(new TextMessage("PONG"));
                return;
            }
            final Long universityId = Long.valueOf(jwtProvider.getClaim(accessToken, Claim.UNIVERSITY));
            final MemberWebsocketMessage requestContainsCreatedAt = MemberWebsocketMessage.createResponse(request, universityId);

            switch (request.roomType()) {
                case AGENDA -> publisher.publishEvent(AgendaMemberEvent.from(session, requestContainsCreatedAt));
                case OPINION -> publisher.publishEvent(OpinionMemberEvent.from(session, requestContainsCreatedAt));
            }
        } catch (AuthException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage(), e.getCode()))));
            session.close();
        } catch (BadWordException | AgendaException | OpinionException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage(), e.getCode()))));
        } catch (Exception e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage(), -1))));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        final Long memberId = Long.valueOf(jwtProvider.getSubject(accessToken));
        publisher.publishEvent(new MemberDisconnectEvent(session, memberId));
        super.afterConnectionClosed(session, status);
    }

    private void validateAccessToken(String accessToken) {
        jwtProvider.validateToken(accessToken);
        final String actual = jwtProvider.getClaim(accessToken, Claim.UUID);
        final String memberId = jwtProvider.getSubject(accessToken);

        final Authority authority = Authority.valueOf(jwtProvider.getClaim(accessToken, Claim.ROLE));
        final String expected = uuidRepository.get(authority, memberId)
                .orElseThrow(() -> new AuthException(INVALID_UUID));
        validateUuid(actual, expected);
    }


    private void validateUuid(String actual, String expected) {
        if (!actual.equals(expected)) {
            throw new AuthException(DUPLICATE_LOGIN);
        }
    }
}
