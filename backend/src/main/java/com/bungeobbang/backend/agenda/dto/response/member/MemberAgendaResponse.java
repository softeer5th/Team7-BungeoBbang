package com.bungeobbang.backend.agenda.dto.response.member;

import com.bungeobbang.backend.agenda.dto.MemberAgendaSubResult;
import com.bungeobbang.backend.common.util.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;

public record MemberAgendaResponse(
        MemberAgendaSubResult agenda,
        @JsonSerialize(using = ObjectIdSerializer.class)
        ObjectId lastReadChatId
) {

}
