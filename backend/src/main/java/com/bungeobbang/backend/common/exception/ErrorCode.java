package com.bungeobbang.backend.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Common
    INVALID_CATEGORY_TYPE(HttpStatus.BAD_REQUEST, "잘못된 카테고리 타입입니다."),
    BADWORD_INCLUDED(HttpStatus.BAD_REQUEST, "금칙어가 포함되어있습니다."),
    //Agenda
    NOT_SUPPORT_STATUS(HttpStatus.BAD_REQUEST, "지원하지 않는 안건 상태입니다."),
    INVALID_AGENDA(HttpStatus.NOT_FOUND, "존재하지 않는 답해요 안건입니다."),
    AGENDA_PARTICIPATION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 답해요 안건에 대해 참여 내역이 없습니다."),
    FORBIDDEN_UNIVERSITY_ACCESS(HttpStatus.FORBIDDEN, "대학교 정보 불일치로 인해 접근이 거부되었습니다."),
    ALREADY_PARTICIPATED(HttpStatus.BAD_REQUEST, "이미 참여한 답해요 안건입니다."),
    NOT_PARTICIPATED(HttpStatus.BAD_REQUEST, "참여하지 않은 답해요 안건입니다."),
    // Opinion
    INVALID_OPINION_TYPE(HttpStatus.BAD_REQUEST, "잘못된 말해요 타입입니다."),
    OPINION_COUNT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "말해요 의견 수 카운트에 실패하였습니다."),
    INVALID_OPINION(HttpStatus.NOT_FOUND, "말해요 채팅방 조회에 실패하였습니다."),
    INVALID_OPINION_CHAT(HttpStatus.NOT_FOUND, "말해요 채팅 조회에 실패하였습니다."),
    INVALID_OPINION_LAST_READ(HttpStatus.NOT_FOUND, "말해요 마지막 읽은 채팅 id 조회에 실패하였습니다."),
    UNAUTHORIZED_OPINION_ACCESS(HttpStatus.FORBIDDEN, "본인이 작성한 말해요 의견이 아닙니다."),
    // Member
    INVALID_MEMBER(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."),
    // University
    INVALID_UNIVERSITY(HttpStatus.NOT_FOUND, "아직 등록되지 않은 대학교입니다."),
    // Auth
    INVALID_AUTHORITY(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),
    INVALID_AUTHORIZATION_CODE(HttpStatus.BAD_REQUEST, "유효하지 않은 인증 코드입니다."),
    NOT_SUPPORTED_OAUTH_SERVICE(HttpStatus.NOT_IMPLEMENTED, "해당 OAuth 서비스는 제공하지 않습니다."),
    OAUTH_ACCESS_TOKEN_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 어세스토큰을 받아오는 데에 실패하였습니다."),
    OAUTH_USER_INFO_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 사용자 정보를 받아오는 데에 실패하였습니다."),
    TEMPLATE_FILE_READ_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 템플릿을 읽는 도중 오류가 발생하였습니다."),
    CODE_MISMATCH(HttpStatus.BAD_REQUEST, "인증코드가 일치하지 않습니다"),
    EMAIL_CODE_EXPIRED(HttpStatus.GONE, "이메일 인증 코드가 만료되었습니다."),
    UNIVERSITY_DOMAIN_MISMATCH(HttpStatus.BAD_REQUEST, "대학교 이메일과 도메인이 일치하지 않습니다."),
    INVALID_ADMIN(HttpStatus.NOT_FOUND, "존재하지 않는 관리자입니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "올바르지 않은 형식의 AccessToken입니다."),
    EXPIRED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "토큰의 유효기간이 만료되었습니다.");


    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
