package com.bungeobbang.backend.chat.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.repository.AgendaMemberRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.chat.event.agenda.AdminConnectEvent;
import com.bungeobbang.backend.chat.event.agenda.AdminWebsocketMessage;
import com.bungeobbang.backend.chat.event.agenda.MemberConnectEvent;
import com.bungeobbang.backend.chat.event.agenda.MemberWebsocketMessage;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AgendaRealTimeChatService {
    private static final String AGENDA_MEMBER_PREFIX = "A_M";
    private static final String AGENDA_ADMIN_PREFIX = "A_A";
    private final AgendaMemberRepository agendaMemberRepository;
    private final AdminRepository adminRepository;
    private final AgendaRepository agendaRepository;
    private final MessageQueueService messageQueueService;
    private final ObjectMapper objectMapper;

    /*
     * 학생 웹소켓 연결 시 참가중인 모든 답해요에 대해 channel 연결
     */
    @EventListener
    public void memberConnect(MemberConnectEvent event) {
        agendaMemberRepository.findAllByMemberId(event.memberId())
                .forEach(agendaMember ->
                        messageQueueService.subscribe(event.session(), AGENDA_ADMIN_PREFIX + agendaMember.getAgenda().getId()));
    }

    @EventListener
    public void adminConnect(AdminConnectEvent event) {
        final Admin admin = adminRepository.findById(event.adminId())
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));
        Long universityId = admin.getUniversity().getId();
        final List<Agenda> agendas = agendaRepository.findAllByUniversityId(universityId);
        agendas.forEach(agenda -> messageQueueService.subscribe(event.session(), AGENDA_MEMBER_PREFIX + agenda.getId()));
    }

    @EventListener
    public void sendMessageFromMember(MemberWebsocketMessage event) {
        try {
            messageQueueService.publish(AGENDA_MEMBER_PREFIX + event.agendaId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @EventListener
    public void sendMessageFromAdmin(AdminWebsocketMessage event) {
        try {
            messageQueueService.publish(AGENDA_ADMIN_PREFIX + event.agendaId(), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
