package com.bungeobbang.backend.agenda.domain;

import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "agenda_last_read_chat")
@Getter
public class AgendaAdminLastReadChat {
    @Id
    private ObjectId id;

    private Long adminId;

    private Long agendaId;

    private ObjectId lastReadChatId;

    @Builder
    public AgendaAdminLastReadChat(ObjectId id, Long adminId, Long agendaId, ObjectId lastReadChatId) {
        this.id = id;
        this.adminId = adminId;
        this.agendaId = agendaId;
        this.lastReadChatId = lastReadChatId;
    }

    @Override
    public String toString() {
        return "AgendaAdminLastReadChat{" +
                "id=" + id +
                ", adminId=" + adminId +
                ", agendaId=" + agendaId +
                ", lastReadChatId=" + lastReadChatId +
                '}';
    }
}
