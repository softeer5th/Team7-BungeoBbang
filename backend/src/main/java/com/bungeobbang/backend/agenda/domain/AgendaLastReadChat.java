package com.bungeobbang.backend.agenda.domain;

import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "agenda_last_read_chat")
@Getter
public class AgendaLastReadChat {
    @Id
    private ObjectId id;

    private Long memberId;

    private Long agendaId;

    private ObjectId lastReadChatId;

    @Builder
    public AgendaLastReadChat(ObjectId id, Long memberId, Long agendaId, ObjectId lastReadChatId) {
        this.id = id;
        this.memberId = memberId;
        this.agendaId = agendaId;
        this.lastReadChatId = lastReadChatId;
    }
}
