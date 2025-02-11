package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.chat.event.agenda.AgendaAdminEvent;
import com.bungeobbang.backend.chat.event.agenda.AgendaMemberEvent;
import com.bungeobbang.backend.chat.event.common.AdminConnectEvent;
import com.bungeobbang.backend.chat.event.common.AdminDisconnectEvent;
import com.bungeobbang.backend.chat.event.common.MemberConnectEvent;
import com.bungeobbang.backend.chat.event.common.MemberDisconnectEvent;
import com.bungeobbang.backend.chat.service.MessageQueueService;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.ECHO_SEND_FAIL;
import static com.bungeobbang.backend.common.exception.ErrorCode.JSON_PARSE_FAIL;

/**
 * 실시간 채팅 서비스 클래스.
 *
 * <p>이 서비스는 학생과 관리자가 참여하는 답해요(Agenda) 기반의 실시간 채팅을 관리한다.</p>
 *
 * <p>주요 기능:</p>
 * <ul>
 *     <li>학생 및 관리자의 웹소켓 연결 관리</li>
 *     <li>채팅 메시지 전송</li>
 *     <li>채널 구독 및 구독 해제</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AgendaRealTimeChatService {
    private static final String AGENDA_MEMBER_PREFIX = "A_M";
    private final AdminRepository adminRepository;
    private final AgendaRepository agendaRepository;
    private final MessageQueueService messageQueueService;
    private static final String AGENDA_ADMIN_PREFIX = "A_A";
    private final ObjectMapper objectMapper;
    private final AgendaMemberRepository agendaMemberRepository;

    /**
     * 학생이 웹소켓에 연결될 때 호출된다.
     * <p>해당 학생이 참여하고 있는 모든 답해요(Agenda)의 관리자 채널에 자동으로 구독한다.</p>
     *
     * @param event 웹소켓 세션과 학생 ID를 포함하는 이벤트 객체
     */
    @EventListener
    public void memberConnect(MemberConnectEvent event) {
        log.info("☄️ memberConnect event: {}", event);
        agendaMemberRepository.findAllByMemberId(event.memberId())
                .forEach(agendaMember ->
                        messageQueueService.subscribe(event.session(), AGENDA_ADMIN_PREFIX + agendaMember.getAgenda().getId()));
    }

    @EventListener
    public void memberDisconnect(MemberDisconnectEvent event) {
        log.info("️✂ memberDisconnect event: {}", event);
        agendaMemberRepository.findAllByMemberId(event.memberId())
                .forEach(agendaMember ->
                        messageQueueService.unsubscribe(event.session(), AGENDA_ADMIN_PREFIX + agendaMember.getAgenda().getId()));
    }

    /**
     * 관리자가 웹소켓에 연결될 때 호출된다.
     * <p>해당 관리자가 속한 대학교의 모든 답해요(Agenda)에 대해 학생 채널에 구독한다.</p>
     *
     * @param event 웹소켓 세션과 관리자 ID를 포함하는 이벤트 객체
     */
    @EventListener
    public void adminConnect(AdminConnectEvent event) {
        log.info("☄️ AdminConnect event: {}", event);
        final List<Agenda> agendas = getAgenda(event.adminId());
        agendas.forEach(agenda -> messageQueueService.subscribe(event.session(), AGENDA_MEMBER_PREFIX + agenda.getId()));
    }

    @EventListener
    public void adminDisconnect(AdminDisconnectEvent event) {
        log.info("️✂ AdminDisconnect event: {}", event);
        final List<Agenda> agendas = getAgenda(event.adminId());
        agendas.forEach(agenda -> messageQueueService.unsubscribe(event.session(), AGENDA_MEMBER_PREFIX + agenda.getId()));
    }


    /**
     * 학생이 보낸 메시지를 해당 답해요(Agenda)의 관리자에게 전송한다.
     *
     * @param event 메시지 내용을 포함한 이벤트 객체
     */
    public void sendMessageFromMember(AgendaMemberEvent event) {
        try {
            // 자기 자신에게 전송
            event.session().sendMessage(new TextMessage(objectMapper.writeValueAsBytes(event.websocketMessage())));

            messageQueueService.publish(AGENDA_MEMBER_PREFIX + event.agendaId(), objectMapper.writeValueAsString(event.websocketMessage()));
        } catch (JsonProcessingException e) {
            throw new AgendaException(JSON_PARSE_FAIL);
        } catch (IOException e) {
            throw new AgendaException(ECHO_SEND_FAIL);
        }
    }

    /**
     * 관리자가 보낸 메시지를 해당 답해요(Agenda)의 학생들에게 전송한다.
     *
     * @param event 메시지 내용을 포함한 이벤트 객체
     */
    public void sendMessageFromAdmin(AgendaAdminEvent event) {
        try {
            // 메아리 전송
            event.session().sendMessage(new TextMessage(objectMapper.writeValueAsBytes(event.websocketMessage())));

            messageQueueService.publish(AGENDA_ADMIN_PREFIX + event.agendaId(), objectMapper.writeValueAsString(event.websocketMessage()));
        } catch (JsonProcessingException e) {
            throw new AgendaException(JSON_PARSE_FAIL);
        } catch (IOException e) {
            throw new AgendaException(ECHO_SEND_FAIL);
        }
    }

    /**
     * 특정 답해요(Agenda) 채널에 학생을 연결한다.
     * <p>해당 학생은 해당 답해요에 속한 관리자들의 메시지를 받을 수 있다.</p>
     *
     * @param session  웹소켓 세션
     * @param agendaId 구독할 답해요의 ID
     */
    public void connectMemberFromAgenda(WebSocketSession session, Long agendaId) {
        messageQueueService.subscribe(session, AGENDA_ADMIN_PREFIX + agendaId);
    }

    /**
     * 특정 답해요(Agenda) 채널에서 학생을 구독 해제한다.
     *
     * @param session  웹소켓 세션
     * @param agendaId 구독 해제할 답해요의 ID
     */
    public void disconnectMemberFromAgenda(WebSocketSession session, Long agendaId) {
        messageQueueService.unsubscribe(session, AGENDA_ADMIN_PREFIX + agendaId);
    }

    /**
     * 특정 답해요(Agenda) 채널에 관리자를 연결한다.
     * <p>해당 관리자는 학생들의 메시지를 받을 수 있다.</p>
     *
     * @param session 웹소켓 세션
     * @param adminId 관리자의 ID
     */
    public void connectAdminFromAgenda(WebSocketSession session, Long adminId) {
        messageQueueService.subscribe(session, AGENDA_MEMBER_PREFIX + adminId);
    }

    /**
     * 특정 답해요(Agenda)에 대한 모든 연결을 해제한다.
     * <p>해당 답해요의 학생 및 관리자 구독을 모두 취소한다.</p>
     *
     * @param agendaId 연결을 해제할 답해요의 ID
     */
    public void disConnectAgenda(Long agendaId) {
        messageQueueService.unsubscribe(AGENDA_ADMIN_PREFIX + agendaId);
        messageQueueService.unsubscribe(AGENDA_MEMBER_PREFIX + agendaId);
    }

    /**
     * 특정 답해요(Agenda)와 관련된 모든 연결을 제거한다.
     * <p>이 작업은 해당 답해요의 모든 채팅 활동을 중단시킨다.</p>
     *
     * @param agendaId 연결을 제거할 답해요의 ID
     */
    public void removeAgendaConnection(Long agendaId) {
        messageQueueService.unsubscribe(AGENDA_ADMIN_PREFIX + agendaId);
        messageQueueService.unsubscribe(AGENDA_MEMBER_PREFIX + agendaId);
    }

    private List<Agenda> getAgenda(Long adminId) {
        final Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        Long universityId = admin.getUniversity().getId();
        return agendaRepository.findAllByUniversityId(universityId);
    }
}
