package com.bungeobbang.backend.agenda.listener;

import com.bungeobbang.backend.agenda.dto.request.AgendaChatRequest;
import com.bungeobbang.backend.agenda.service.AdminAgendaChatService;
import com.bungeobbang.backend.agenda.service.AgendaChatService;
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

    @EventListener
    public void handleAgendaEvent(AgendaMemberEvent event) {
        switch (event.eventType()) {
            case ENTER -> agendaChatService.updateLastReadToMax(event.agendaId(), event.memberId());
            case CHAT -> agendaChatService.saveChat(new AgendaChatRequest(
                    event.agendaId(),
                    event.memberId(),
                    event.chat(),
                    event.images()
            ));
        }
    }

    @EventListener
    public void handleAdminAgendaEvent(AgendaAdminEvent event) {
        switch (event.eventType()) {
            case ENTER -> adminAgendaChatService.updateLastReadToMax(event.agendaId(), event.adminId());
            case CHAT -> adminAgendaChatService.saveChat(new AgendaChatRequest(
                    event.agendaId(),
                    event.adminId(),
                    event.chat(),
                    event.images()
            ));
        }
    }
}
