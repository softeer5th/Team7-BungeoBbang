package com.bungeobbang.backend.common.config;


import com.bungeobbang.backend.chat.handler.StudentWebSocketChatHandler;
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
    private final StudentWebSocketChatHandler webSocketChatHandler;

    private final WebSocketAuthInterceptor webSocketAuthInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketChatHandler, "/students")
                .addInterceptors(webSocketAuthInterceptor)
                .setAllowedOrigins("*");
    }
}