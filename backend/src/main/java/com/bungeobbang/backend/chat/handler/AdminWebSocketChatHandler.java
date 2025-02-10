package com.bungeobbang.backend.chat.handler;


import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.chat.event.common.AdminConnectEvent;
import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.event.agenda.AgendaAdminEvent;
import com.bungeobbang.backend.chat.event.opinion.OpinionAdminEvent;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.BadWordException;
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

import static com.bungeobbang.backend.chat.type.RoomType.AGENDA;
import static com.bungeobbang.backend.chat.type.SocketEventType.CHAT;
import static com.bungeobbang.backend.chat.type.SocketEventType.ERROR;

@Component
@Log4j2
@RequiredArgsConstructor
public class AdminWebSocketChatHandler extends TextWebSocketHandler {
    private static final String ACCESS_TOKEN = "accessToken";
    private final JwtProvider jwtProvider;
    private final BadWordService badWordService;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher publisher;

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
            jwtProvider.validateToken(accessToken);
            final AdminWebsocketMessage request = objectMapper.readValue(message.getPayload(), AdminWebsocketMessage.class);
            // createdAt 생성하여 requestContainsCreatedAt 객체 생성
            final AdminWebsocketMessage requestContainsCreatedAt = AdminWebsocketMessage.createResponse(request);


            if (request.event().equals(CHAT)) {
                badWordService.validate(request.message());
                publisher.publishEvent(requestContainsCreatedAt);
            }

            if (request.event().equals(CHAT) && request.roomType().equals(AGENDA))
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(requestContainsCreatedAt)));


            switch (request.roomType()) {
                case AGENDA -> publisher.publishEvent(AgendaAdminEvent.from(session, requestContainsCreatedAt));
                case OPINION -> publisher.publishEvent(OpinionAdminEvent.from(session, requestContainsCreatedAt));
            }
        } catch (AuthException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage()))));
            session.close();
        } catch (BadWordException e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage()))));
        } catch (Exception e) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new AdminWebsocketMessage(ERROR, e.getMessage()))));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }
}
