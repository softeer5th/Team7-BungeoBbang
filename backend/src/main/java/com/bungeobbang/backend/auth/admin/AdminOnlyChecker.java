package com.bungeobbang.backend.auth.admin;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.AuthException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_AUTHORITY;

/**
 * 🔹 관리자 전용 접근 검증 AOP (Authorization)
 * <p>
 * - `@AdminOnly` 어노테이션이 붙은 메서드 실행 전에 관리자 권한을 검사합니다.
 * - `Accessor` 인터페이스를 구현한 객체가 메서드 인자로 포함되어야 합니다.
 * - `isAdmin()` 메서드를 통해 사용자가 관리자인지 확인 후, 관리자 권한이 없으면 예외를 발생시킵니다.
 * </p>
 * <p>
 * ✅ **Authorization(인가) 로직 적용**
 * - AOP(`@Aspect`)를 활용하여 인증(Authorization) 검증을 수행.
 * - `@Before("@annotation(AdminOnly)")`를 사용하여 `@AdminOnly` 어노테이션이 있는 메서드를 감지.
 * - 관리자 권한이 없으면 `AuthException(INVALID_AUTHORITY)` 발생.
 */
@Aspect
@Component
@Slf4j
public class AdminOnlyChecker {

    /**
     * ✅ 관리자 권한 검증 메서드 (AOP)
     * <p>
     * - `@AdminOnly`가 적용된 메서드 실행 전에 실행됩니다.
     * - 메서드 인자 중 `Accessor`를 구현한 객체가 있는 경우, `isAdmin()`을 호출하여 관리자 여부를 확인합니다.
     * - 관리자가 아닐 경우, `AuthException`을 발생시킵니다.
     * </p>
     *
     * @param joinPoint 현재 실행 중인 메서드의 실행 정보 (AOP)
     * @throws AuthException 관리자가 아닐 경우 `INVALID_AUTHORITY (401)` 예외 발생
     */
    @Before("@annotation(com.bungeobbang.backend.auth.admin.AdminOnly)")
    public void check(final JoinPoint joinPoint) {
        Arrays.stream(joinPoint.getArgs())  // 메서드 인자 확인
                .filter(Accessor.class::isInstance) // `Accessor` 인터페이스를 구현한 객체 찾기
                .map(Accessor.class::cast)
                .filter(Accessor::isAdmin) // `isAdmin()`을 통해 관리자 여부 확인
                .findFirst()
                .orElseThrow(() -> new AuthException(INVALID_AUTHORITY));
    }
}
