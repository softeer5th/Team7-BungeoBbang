package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.chat.event.common.AdminConnectEvent;
import com.bungeobbang.backend.chat.event.common.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.event.common.MemberConnectEvent;
import com.bungeobbang.backend.chat.event.common.MemberWebsocketMessage;
import com.bungeobbang.backend.chat.service.MessageQueueService;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
@RequiredArgsConstructor
public class OpinionRealTimeChatService {
    private static final String OPINION_PREFIX = "O_";
    private final OpinionRepository opinionRepository;
    private final MessageQueueService messageQueueService;
    private final AdminRepository adminRepository;
    private final ObjectMapper objectMapper;

    @EventListener
    public void memberConnect(final MemberConnectEvent event) {
        opinionRepository.findAllByMemberId(event.memberId())
                .forEach(opinion ->
                        messageQueueService.subscribe(event.session(), OPINION_PREFIX + opinion.getId()));
    }

    @EventListener
    public void adminConnect(final AdminConnectEvent event) {
        final Admin admin = adminRepository.findById(event.adminId())
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        final Long universityId = admin.getUniversity().getId();
        opinionRepository.findAllByUniversityId(universityId)
                .forEach(opinion ->
                        messageQueueService.subscribe(event.session(), OPINION_PREFIX + opinion.getId()));
    }

    @EventListener
    public void sendMessageFromMember(final MemberWebsocketMessage event) {
        try {
            messageQueueService.publish(OPINION_PREFIX + event.opinionId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new OpinionException(ErrorCode.JSON_PARSE_FAIL);
        }
    }

    @EventListener
    public void sendMessageFromAdmin(final AdminWebsocketMessage event) {
        try {
            messageQueueService.publish(OPINION_PREFIX + event.opinionId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new OpinionException(ErrorCode.JSON_PARSE_FAIL);
        }
    }

    /*
     * 새로 개설된 말해요 채팅방 구독
     * 개설한 학생 1명, 모든 학생회 n명
     *
     */
    public void subscribeToOpinion(final WebSocketSession session, Long opinionId) {
        messageQueueService.subscribe(session, OPINION_PREFIX + opinionId);
    }

    public void disconnect(final WebSocketSession session, Long opinionId) {
        messageQueueService.unsubscribe(session, OPINION_PREFIX + opinionId);
    }

    public void removeOpinionTopic(final Long opinionId) {
        messageQueueService.unsubscribe(OPINION_PREFIX + opinionId);
    }
}
