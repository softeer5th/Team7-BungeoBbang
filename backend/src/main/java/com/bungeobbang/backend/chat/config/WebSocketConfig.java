package com.bungeobbang.backend.chat.config;


import com.bungeobbang.backend.chat.handler.AdminWebSocketChatHandler;
import com.bungeobbang.backend.chat.handler.MemberWebSocketChatHandler;
import com.bungeobbang.backend.chat.interceptor.WebSocketAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final MemberWebSocketChatHandler webSocketChatHandler;
    private final AdminWebSocketChatHandler adminWebSocketChatHandler;
    private final WebSocketAuthInterceptor webSocketAuthInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketChatHandler, "/students")
                .addHandler(adminWebSocketChatHandler, "/admins")
                .addInterceptors(webSocketAuthInterceptor)
                .setAllowedOriginPatterns("*");
    }
}