package com.bungeobbang.backend.chat.event.opinion;

import com.bungeobbang.backend.opinion.service.OpinionRealTimeChatService;
import com.bungeobbang.backend.opinion.service.OpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpinionEventListener {
    private final OpinionService opinionService;
    private final OpinionRealTimeChatService opinionRealTimeChatService;

    @EventListener
    public void handleMemberOpinionEvent(OpinionMemberEvent event) {
        switch (event.eventType()) {
            // 마지막 읽은 채팅ID MAX
            case ENTER -> opinionService.updateLastReadToMax(event.opinionId(), false);
            // 채팅 저장
            case CHAT -> opinionService.saveChat(
                    event.memberId(),
                    event.opinionId(),
                    event.chat(),
                    event.images(),
                    false,
                    event.createdAt()
            );
            // 마지막 채팅 ID 저장
            case LEAVE -> opinionService.updateLastReadToLastChatId(event.opinionId(), false);
            // 새로 구독
            case START -> opinionRealTimeChatService.subscribeToOpinion(event.session(), event.opinionId());
            // 구독 취소
            case EXIT -> opinionRealTimeChatService.removeOpinionTopic(event.opinionId());
        }
    }

    @EventListener
    public void handleAdminOpinionEvent(OpinionAdminEvent event) {
        switch (event.eventType()) {
            case ENTER -> opinionService.updateLastReadToMax(event.opinionId(), true);
            case CHAT -> opinionService.saveChat(
                    event.adminId(),
                    event.opinionId(),
                    event.chat(),
                    event.images(),
                    true,
                    event.createdAt()
            );
            case LEAVE -> opinionService.updateLastReadToLastChatId(event.adminId(), false);
        }
    }
}
