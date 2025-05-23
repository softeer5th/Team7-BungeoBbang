package com.bungeobbang.backend.agenda.listener;

import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.service.AdminAgendaChatService;
import com.bungeobbang.backend.agenda.service.AgendaRealTimeChatService;
import com.bungeobbang.backend.agenda.service.AgendaValidService;
import com.bungeobbang.backend.agenda.service.MemberAgendaChatService;
import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.chat.event.agenda.AgendaAdminEvent;
import com.bungeobbang.backend.chat.event.agenda.AgendaMemberEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AgendaEventListener {
    private final BadWordService badWordService;
    private final AgendaValidService agendaValidService;
    private final AdminAgendaChatService adminAgendaChatService;
    private final MemberAgendaChatService memberAgendaChatService;
    private final AgendaRealTimeChatService agendaRealTimeChatService;

    /*
     * 학생 채팅 이벤트
     * 1. 채팅방 화면 입장
     * 2. 채팅 전송
     * 3. 채팅방 화면 이탈
     * 4. 채팅방 참여하기
     */
    @EventListener
    public void handleMemberAgendaEvent(AgendaMemberEvent event) {
        switch (event.eventType()) {
            case ENTER -> memberAgendaChatService.updateLastReadToMax(event.agendaId(), event.memberId());
            case CHAT -> {
                agendaValidService.checkAgendaIsActive(event.agendaId());
                badWordService.validate(event.chat());
                agendaRealTimeChatService.sendMessageFromMember(event);
                memberAgendaChatService.saveChat(new AgendaChatRequest(
                        event.agendaId(),
                        event.memberId(),
                        event.chat(),
                        event.images(),
                        event.createdAt()
                ));
            }
            case LEAVE -> memberAgendaChatService.updateLastRead(event.agendaId(), event.memberId());
            case EXIT -> agendaRealTimeChatService.disconnectMemberFromAgenda(event.session(), event.agendaId());
            case PARTICIPATE -> agendaRealTimeChatService.connectMemberFromAgenda(event.session(), event.agendaId());
        }
    }

    /*
     * 학생회 이벤트
     * 1. 채팅방 화면 입장
     * 2. 채팅 전송
     * 3. 채팅방 화면 이탈
     * 4. 채팅방 시작
     * 5. 채팅방 종료
     * 6. 채팅방 삭제
     */
    @EventListener
    public void handleAdminAgendaEvent(AgendaAdminEvent event) {
        switch (event.eventType()) {
            case ENTER -> adminAgendaChatService.updateLastReadToMax(event.agendaId(), event.adminId());
            case CHAT -> {
                agendaValidService.checkAgendaIsActive(event.agendaId());
                badWordService.validate(event.chat());
                agendaRealTimeChatService.sendMessageFromAdmin(event);
                adminAgendaChatService.saveChat(new AgendaChatRequest(
                        event.agendaId(),
                        event.adminId(),
                        event.chat(),
                        event.images(),
                        event.createdAt()
                ));
            }
            case LEAVE -> adminAgendaChatService.updateLastRead(event.agendaId(), event.adminId());
            case START -> {
                // 오늘 시작인거만 구독
                if (agendaValidService.isAgendaStartsToday(event.agendaId())) {
                    agendaRealTimeChatService.connectAdminFromAgenda(event.session(), event.agendaId());
                }
            }
            case CLOSE, DELETE -> agendaRealTimeChatService.disConnectAgenda(event.agendaId());
        }
    }
}
