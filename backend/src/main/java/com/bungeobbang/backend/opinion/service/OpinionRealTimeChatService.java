package com.bungeobbang.backend.opinion.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.chat.event.common.*;
import com.bungeobbang.backend.chat.event.opinion.OpinionCreationEvent;
import com.bungeobbang.backend.chat.service.MessageQueueService;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.opinion.domain.OpinionLastRead;
import com.bungeobbang.backend.opinion.domain.repository.OpinionLastReadRepository;
import com.bungeobbang.backend.opinion.domain.repository.OpinionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpinionRealTimeChatService {
    private static final String OPINION_PREFIX = "O_";
    private static final String OPINION_UNIV_PREFIX = "OU_";
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private final OpinionRepository opinionRepository;
    private final MessageQueueService messageQueueService;
    private final AdminRepository adminRepository;
    private final ObjectMapper objectMapper;
    private final OpinionLastReadRepository opinionLastReadRepository;
    private final OpinionService opinionService;

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

        messageQueueService.subscribe(event.session(), OPINION_UNIV_PREFIX + universityId);
    }

    public void sendMessageFromMember(final MemberWebsocketMessage event) {
        try {
            messageQueueService.publish(OPINION_PREFIX + event.opinionId(), objectMapper.writeValueAsString(event));

            // 대학에다가 보낸다
            messageQueueService.publish(OPINION_UNIV_PREFIX + event.universityId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new OpinionException(ErrorCode.JSON_PARSE_FAIL);
        }
    }

    public void sendMessageFromAdmin(final AdminWebsocketMessage event) {
        try {
            messageQueueService.publish(OPINION_UNIV_PREFIX + event.universityId(), objectMapper.writeValueAsString(event));
            messageQueueService.publish(OPINION_PREFIX + event.opinionId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new OpinionException(ErrorCode.JSON_PARSE_FAIL);
        }
    }

    public void validateExistOpinion(final Long opinionId) {
        opinionRepository.findById(opinionId)
                .orElseThrow(() -> new OpinionException(ErrorCode.DELETED_OPINION));
    }

    public void sendOpinionStartToUniversity(Long universityId, OpinionCreationEvent event) {
        try {
            messageQueueService.publish(OPINION_UNIV_PREFIX + universityId, objectMapper.writeValueAsString(event));
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

    @EventListener
    public void disconnectMember(final MemberDisconnectEvent event) {
        List<Long> opinionIds = opinionRepository.findAllOpinionIdsByMemberId(event.memberId());
        List<OpinionLastRead> lastReads = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, false);
        lastReads.forEach(lastRead -> {
            if (lastRead.getLastReadChatId().equals(MAX_OBJECT_ID)) {
                opinionService.updateLastReadToLastChatId(lastRead.getOpinionId(), false);
            }
        });

        opinionIds.forEach(opinionId -> {
                    messageQueueService.unsubscribe(event.session(), OPINION_PREFIX + opinionId);
                });
    }

    @EventListener
    public void disconnectAdmin(final AdminDisconnectEvent event) {
        Admin admin = adminRepository.findById(event.adminId())
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        List<Long> opinionIds = opinionRepository.findAllOpinionIdsByUniversityId(admin.getUniversity().getId());
        List<OpinionLastRead> lastReads = opinionLastReadRepository.findByOpinionIdInAndIsAdmin(opinionIds, true);
        lastReads.forEach(lastRead -> {
            if (lastRead.getLastReadChatId().equals(MAX_OBJECT_ID)) {
                opinionService.updateLastReadToLastChatId(lastRead.getOpinionId(), true);
            }
        });
        messageQueueService.unsubscribe(event.session(), OPINION_UNIV_PREFIX + admin.getUniversity().getId());
    }

    public void removeOpinionTopic(final Long opinionId) {
        messageQueueService.unsubscribe(OPINION_PREFIX + opinionId);
    }
}
