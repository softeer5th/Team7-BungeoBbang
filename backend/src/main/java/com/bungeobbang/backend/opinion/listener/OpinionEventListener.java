package com.bungeobbang.backend.opinion.listener;

import com.bungeobbang.backend.badword.service.BadWordService;
import com.bungeobbang.backend.chat.event.opinion.OpinionAdminEvent;
import com.bungeobbang.backend.chat.event.opinion.OpinionMemberEvent;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.bungeobbang.backend.opinion.service.AdminOpinionService;
import com.bungeobbang.backend.opinion.service.OpinionRealTimeChatService;
import com.bungeobbang.backend.opinion.service.OpinionService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OpinionEventListener {
    private final OpinionService opinionService;
    private final BadWordService badWordService;
    private final OpinionRealTimeChatService opinionRealTimeChatService;
    private final AdminOpinionService adminOpinionService;

    @EventListener
    public void handleMemberOpinionEvent(OpinionMemberEvent event) {
        switch (event.websocketMessage().event()) {
            // 마지막 읽은 채팅ID MAX
            case ENTER -> {
                opinionRealTimeChatService.validateExistOpinion(event.websocketMessage().opinionId());
                opinionService.updateLastReadToMax(event.websocketMessage().opinionId(), false);
            }
            // 채팅 금칙어 필터링, 해당 채팅방 존재 여부 검증, 메시지 전송/저장
            case CHAT -> {
                opinionRealTimeChatService.validateExistOpinion(event.websocketMessage().opinionId());
                badWordService.validate(event.websocketMessage().message());
                opinionService.validateChatCount(event.websocketMessage().opinionId());
                opinionRealTimeChatService.sendMessageFromMember(event.websocketMessage());
                opinionService.saveChat(
                        event.websocketMessage().memberId(),
                        event.websocketMessage().opinionId(),
                        event.websocketMessage().message(),
                        event.websocketMessage().images(),
                    false,
                        event.websocketMessage().createdAt()
                );
            }
            // 마지막 채팅 ID 저장
            case LEAVE -> opinionService.updateLastReadToLastChatId(event.websocketMessage().opinionId(), false);
            // 새로 구독
            case START ->
                    opinionRealTimeChatService.subscribeToOpinion(event.session(), event.websocketMessage().opinionId());
            // 채팅방 삭제 ( 학생이 나가기버튼 누른 경우 )
            case DELETE -> opinionRealTimeChatService.removeOpinionTopic(event.websocketMessage().opinionId());
        }
    }

    @EventListener
    public void handleAdminOpinionEvent(OpinionAdminEvent event) {
        switch (event.websocketMessage().event()) {
            case ENTER -> {
                opinionRealTimeChatService.validateExistOpinion(event.websocketMessage().opinionId());
                // 학생이 새로 생성한 채팅방인 경우, 입장할 때 구독해야 한다.
                opinionRealTimeChatService.subscribeToOpinion(event.session(), event.websocketMessage().opinionId());
                opinionService.updateLastReadToMax(event.websocketMessage().opinionId(), true);
            }

            case CHAT -> {
                opinionRealTimeChatService.validateExistOpinion(event.websocketMessage().opinionId());
                badWordService.validate(event.websocketMessage().message());
                opinionRealTimeChatService.sendMessageFromAdmin(event.websocketMessage());
                final OpinionChat savedChat = opinionService.saveChat(
                        event.websocketMessage().adminId(),
                        event.websocketMessage().opinionId(),
                        event.websocketMessage().message(),
                        event.websocketMessage().images(),
                        true,
                        event.websocketMessage().createdAt()
                );
                // 통계를 위해 answered_opinion 컬렉션 업데이트(upsert)
                adminOpinionService.updateAnsweredOpinion(savedChat);
                adminOpinionService.unsetRemindOpinion(event.websocketMessage().opinionId());
            }
            case LEAVE -> opinionService.updateLastReadToLastChatId(event.websocketMessage().opinionId(), true);
        }
    }
}
