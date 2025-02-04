package com.bungeobbang.backend.agenda.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 🔹 MongoDB 기반 "답해요" 채팅 엔티티 (부모 클래스)
 * <p>
 * - 일반 사용자 & 관리자 채팅을 같은 컬렉션에 저장합니다.
 * - MongoDB 컬렉션 `agenda_chat`에 저장됩니다.
 * - `AgendaAdminChat`이 이 클래스를 상속하여 같은 컬렉션에 저장됩니다.
 * </p>
 */
@Document(collection = "agenda_chat") // ✅ 단일 컬렉션 사용
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AgendaChat {
    @Id
    private ObjectId id;

    @Field("agendaId")
    private Long agendaId;

    @Field("chat")
    private String chat;

    @Field("images")
    private List<String> images;

    @Field("isAdmin")
    private boolean isAdmin;

    @Field("member_id")
    private Long memberId;

    @CreatedDate
    @Field("createdAt")
    private LocalDateTime createdAt;
}
