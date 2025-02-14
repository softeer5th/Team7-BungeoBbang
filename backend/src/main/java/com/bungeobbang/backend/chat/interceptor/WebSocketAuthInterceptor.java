package com.bungeobbang.backend.chat.interceptor;


import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.auth.Claim;
import com.bungeobbang.backend.auth.JwtProvider;
import com.bungeobbang.backend.auth.domain.Authority;
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

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_ADMIN;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_MEMBER;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements HandshakeInterceptor {
    private static final String MEMBER_ENDPOINT = "/students";
    private static final String ADMIN_ENDPOINT = "/admins";
    private static final String ACCESS_TOKEN = "accessToken";
    private static final String SEC_WEBSOCKET_PROTOCOL = "Sec-WebSocket-Protocol";
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final AdminRepository adminRepository;

    /**
     * 웹소켓 연결 전 인터셉터
     * Authorization 헤더를 확인하여 유저를 인증한다.
     * 유저 명이 채팅유저로 시작하지 않으면 401을 반환한다.
     * 인증된 유저라면 session에 accessToken을 저장한다.
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (!(request instanceof ServletServerHttpRequest)) {
            return false;
        }

        HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        HttpHeaders headers = request.getHeaders();
        String connectEndPoint = servletRequest.getRequestURI();

        List<String> protocols = headers.get(SEC_WEBSOCKET_PROTOCOL);
        if (protocols == null || protocols.size() != 1) {
            return false;
        }

        try {
            String accessToken = protocols.get(0).trim();
            attributes.put(ACCESS_TOKEN, accessToken);

            // ✅ 사용자 검증 및 권한 체크
            Authority authority = validateAccessToken(accessToken);
            validateEndpointAccess(authority, connectEndPoint);

            response.getHeaders().set(SEC_WEBSOCKET_PROTOCOL, accessToken);
            return true;

        } catch (AuthException e) {
            return handleAuthException(servletResponse, e.getMessage());
        } catch (Exception e) {
            log.error("❌ WebSocket 핸드셰이크 오류: {}", e.getMessage());
            return handleAuthException(servletResponse, e.getMessage());
        }
    }

    private Authority validateAccessToken(String accessToken) {
        final String role = jwtProvider.getClaim(accessToken, Claim.ROLE);
        Authority authority = Authority.valueOf(role);

        switch (authority) {
            case ADMIN -> {
                Long adminId = Long.valueOf(jwtProvider.getSubject(accessToken));
                adminRepository.findById(adminId).orElseThrow(() -> new AuthException(INVALID_ADMIN));
            }
            case MEMBER -> {
                Long memberId = Long.valueOf(jwtProvider.getSubject(accessToken));
                memberRepository.findById(memberId).orElseThrow(() -> new AuthException(INVALID_MEMBER));
            }
        }
        return authority;
    }

    private void validateEndpointAccess(Authority authority, String connectEndPoint) {
        if (authority == Authority.ADMIN && !connectEndPoint.equals(ADMIN_ENDPOINT)) {
            throw new AuthException(ErrorCode.INVALID_AUTHORITY);
        }
        if (authority == Authority.MEMBER && !connectEndPoint.equals(MEMBER_ENDPOINT)) {
            throw new AuthException(ErrorCode.INVALID_AUTHORITY);
        }
    }

    private boolean handleAuthException(HttpServletResponse response, String message) {
        try {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
        } catch (Exception e) {
            log.error("❌ 인증 예외 응답 실패: {}", e.getMessage());
        }
        return false;
    }


    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
