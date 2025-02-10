package com.bungeobbang.backend.chat.handler;


import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.chat.event.agenda.AgendaMemberEvent;
import com.bungeobbang.backend.chat.event.agenda.MemberConnectEvent;
import com.bungeobbang.backend.chat.event.agenda.MemberWebsocketMessage;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.BadWordException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

import static com.bungeobbang.backend.chat.type.RoomType.AGENDA;
import static com.bungeobbang.backend.chat.type.SocketEventType.CHAT;
import static com.bungeobbang.backend.chat.type.SocketEventType.ERROR;

@Component
@RequiredArgsConstructor
public class MemberWebSocketChatHandler extends TextWebSocketHandler {
    private static final String ACCESS_TOKEN = "accessToken";
    private final JwtProvider jwtProvider;
    private final BadWordService badWordService;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher publisher;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        final String userId = jwtProvider.getSubject(accessToken);

        publisher.publishEvent(new MemberConnectEvent(session, Long.valueOf(userId)));

        super.afterConnectionEstablished(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        final String accessToken = (String) session.getAttributes().get(ACCESS_TOKEN);
        try {
            jwtProvider.validateToken(accessToken);
            final MemberWebsocketMessage request = objectMapper.readValue(message.getPayload(), MemberWebsocketMessage.class);

            if (request.event().equals(CHAT)) {
                badWordService.validate(request.message());
                publisher.publishEvent(request);
            }

            if (request.event().equals(CHAT) && request.roomType().equals(AGENDA))
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(request)));

            switch (request.roomType()) {
                case AGENDA -> publisher.publishEvent(AgendaMemberEvent.from(session, request));

            }
        } catch (AuthException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage()))));
            session.close();
        } catch (BadWordException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage()))));
        } catch (Exception e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new MemberWebsocketMessage(ERROR, e.getMessage()))));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }
}
