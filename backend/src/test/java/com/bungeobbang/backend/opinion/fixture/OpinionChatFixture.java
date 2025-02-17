package com.bungeobbang.backend.opinion.fixture;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import org.bson.types.ObjectId;

public class OpinionChatFixture {
    public static OpinionChat NAVER_MEMBER1_OPINION1_CHAT = OpinionChat.builder()
            .id(new ObjectId("67a32aa7b444787c4d7b7711"))
            .memberId(1L)
            .opinionId(1L)
            .chat("naver chat1")
            .isAdmin(false)
            .build();

    public static OpinionChat NAVER_MEMBER2_OPINION2_CHAT = OpinionChat.builder()
            .id(new ObjectId("67a32aa7b444787c4d7b7712"))
            .memberId(2L)
            .opinionId(2L)
            .chat("naver chat2")
            .isAdmin(false)
            .build();

    public static OpinionChat NAVER_ADMIN1_OPINION1_CHAT = OpinionChat.builder()
            .id(new ObjectId("67a32aa7b444787c4d7b7713"))
            .memberId(1L)
            .opinionId(1L)
            .chat("naver admin chat1")
            .isAdmin(true)
            .build();
}
