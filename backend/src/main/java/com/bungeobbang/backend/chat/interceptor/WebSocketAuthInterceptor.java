package com.bungeobbang.backend.chat.interceptor;


import com.bungeobbang.backend.auth.BearerAuthorizationExtractor;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.member.domain.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements HandshakeInterceptor {
    private static final String ACCESS_TOKEN = "accessToken";
    private static final String SEC_WEBSOCKET_PROTOCOL = "Sec-WebSocket-Protocol";
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final BearerAuthorizationExtractor extractor;

    /**
     * 웹소켓 연결 전 인터셉터
     * Authorization 헤더를 확인하여 유저를 인증한다.
     * 유저 명이 채팅유저로 시작하지 않으면 401을 반환한다.
     * 인증된 유저라면 session에 accessToken을 저장한다.
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();

            HttpHeaders headers = request.getHeaders();
            List<String> protocols = headers.get(SEC_WEBSOCKET_PROTOCOL);

            try {
                if (protocols != null && protocols.size() == 1) {
                    String accessToken = protocols.get(0).trim();
                    attributes.put(ACCESS_TOKEN, accessToken);
                    Long memberId = Long.valueOf(jwtProvider.getSubject(accessToken));
                    memberRepository.findById(memberId)
                            .orElseThrow(() -> new AuthException(ErrorCode.INVALID_MEMBER));

                    response.getHeaders().set(SEC_WEBSOCKET_PROTOCOL, accessToken);
                    return true;
                }
            } catch (AuthException e) {
                servletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                return false;
            } catch (Exception e) {
                log.info(e.getMessage());
                servletResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
                return false;
            }
        }
        return false;

    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}