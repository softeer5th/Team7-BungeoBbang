package com.bungeobbang.backend.auth.admin;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 🔹 관리자 전용 접근 제어 어노테이션
 * <p>
 * - 이 어노테이션이 붙은 메서드는 **관리자(Admin)만 실행 가능** 합니다.
 * - `AdminOnlyChecker` AOP를 통해 자동으로 관리자의 권한을 확인합니다.
 * - 관리자가 아닐 경우, **401 UNAUTHORIZED (`AuthException`)** 예외가 발생합니다.
 * </p>
 * <p>
 * ✅ **사용법**
 * <pre>
 * {@code
 * @AdminOnly
 * @PostMapping("/admin/create")
 * public ResponseEntity<String> createAdminContent() {
 *     return ResponseEntity.ok("관리자 전용 컨텐츠 생성 완료!");
 * }
 * }
 * </pre>
 *
 * @see com.bungeobbang.backend.auth.admin.AdminOnlyChecker
 */
@Target(METHOD) // ✅ 메서드에만 적용 가능
@Retention(RUNTIME) // ✅ 런타임에 동작 (Reflection 활용 가능)
public @interface AdminOnly {
}
