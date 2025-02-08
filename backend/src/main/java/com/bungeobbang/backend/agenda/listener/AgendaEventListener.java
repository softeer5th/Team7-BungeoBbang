package com.bungeobbang.backend.agenda.listener;

import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.service.AdminAgendaChatService;
import com.bungeobbang.backend.agenda.service.AgendaChatService;
import com.bungeobbang.backend.agenda.service.AgendaRealTimeChatService;
import com.bungeobbang.backend.chat.event.agenda.AgendaAdminEvent;
import com.bungeobbang.backend.chat.event.agenda.AgendaMemberEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AgendaEventListener {
    private final AgendaChatService agendaChatService;
    private final AdminAgendaChatService adminAgendaChatService;
    private final AgendaRealTimeChatService agendaRealTimeChatService;

    /*
     * 학생 채팅 이벤트
     * 1. 채팅방 화면 입장
     * 2. 채팅 전송
     * 3. 채팅방 화면 이탈
     * 4. 채팅방 참여하기
     */
    @EventListener
    public void handleAgendaEvent(AgendaMemberEvent event) {
        switch (event.eventType()) {
            case ENTER -> agendaChatService.updateLastReadToMax(event.agendaId(), event.memberId());
            case CHAT -> agendaChatService.saveChat(new AgendaChatRequest(
                    event.agendaId(),
                    event.memberId(),
                    event.chat(),
                    event.images(),
                    event.createdAt()
            ));
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
            case CHAT -> adminAgendaChatService.saveChat(new AgendaChatRequest(
                    event.agendaId(),
                    event.adminId(),
                    event.chat(),
                    event.images(),
                    event.createdAt()
            ));
            case START -> agendaRealTimeChatService.connectAdminFromAgenda(event.session(), event.agendaId());
            case CLOSE -> agendaRealTimeChatService.disConnectAgenda(event.agendaId());
            case DELETE -> agendaRealTimeChatService.removeAgendaConnection(event.agendaId());
        }
    }
}
