package com.bungeobbang.backend.chat.type;

public enum SocketEventType {
    PING("클라이언트로부터 PING"),
    ENTER("채팅방 화면 입장"),
    CHAT("채팅 전송"),
    LEAVE("채팅방 화면 이탈"),
    EXIT("채팅방 나가기"),
    PARTICIPATE("채팅방 참여하기"),
    START("채팅방 시작"),
    CLOSE("채팅방 종료"),
    DELETE("채팅방 삭제"),
    ERROR("에러");

    SocketEventType(String description) {
    }
}
