package com.bungeobbang.backend.agenda.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.bson.codecs.pojo.annotations.BsonProperty;

import static lombok.AccessLevel.PROTECTED;

@AllArgsConstructor(access = PROTECTED)
@Getter
public class AgendaChat {
    @BsonProperty("memberId")
    private Long memberId;

    @BsonProperty("agendaId")
    private Long agendaId;

    @BsonProperty("chat")
    private String chat;

    @BsonProperty("images")
    private String[] images;

    @BsonProperty("isAdmin")
    private boolean isAdmin;
}
