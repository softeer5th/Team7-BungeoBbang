package com.bungeobbang.backend.aop;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class HttpRequestLoggingAspect {

    private final HttpServletRequest request;

    public HttpRequestLoggingAspect(HttpServletRequest request) {
        this.request = request;
    }

    /**
     * 🔹 모든 Controller의 메서드 실행 전 요청 로깅
     */
    @Before("execution(* com.bungeobbang.backend..*Controller.*(..))") // Controller 패키지 내 모든 메서드
    public void logBefore(JoinPoint joinPoint) {
        log.info("📌 HTTP Request Received:");
        log.info("🔹 Method: {} {}", request.getMethod(), request.getRequestURI());
        log.info("🔹 Query Params: {}", request.getQueryString());
        log.info("🔹 Method: {}", joinPoint.getSignature().getName());
        log.info("🔹 Args: {}", Arrays.toString(joinPoint.getArgs()));
    }


    /**
     * 🔹 예외 발생 시 로깅
     */
    @AfterThrowing(value = "execution(* com.bungeobbang.backend..*Controller.*(..))", throwing = "exception")
    public void logAfterThrowing(Exception exception) {
        log.error("❌ Exception: {}", exception.getMessage(), exception);
    }
}
