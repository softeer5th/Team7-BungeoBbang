package com.bungeobbang.backend.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // IMAGE
    EXCEED_IMAGE_LIST_SIZE(1, HttpStatus.BAD_REQUEST, "이미지 최대 개수를 초과하였습니다."),
    EMPTY_IMAGE_LIST(2, HttpStatus.BAD_REQUEST, "이미지 리스트 비었습니다."),
    INVALID_IMG_PATH(3, HttpStatus.BAD_REQUEST, "잘못된 파일 경로입니다."),
    IMAGE_UPLOAD_FAIL(4, HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패하였습니다."),
    IMAGE_DELETE_FAIL(5, HttpStatus.INTERNAL_SERVER_ERROR, "이미지 삭제에 실패하였습니다."),
    // Common
    INVALID_CATEGORY_TYPE(6, HttpStatus.BAD_REQUEST, "잘못된 카테고리 타입입니다."),
    BADWORD_INCLUDED(7, HttpStatus.BAD_REQUEST, "금칙어가 포함되어있습니다."),
    JSON_PARSE_FAIL(8, HttpStatus.INTERNAL_SERVER_ERROR, "json 파싱에 실패하였습니다."),
    // Agenda
    NOT_SUPPORT_STATUS(9, HttpStatus.BAD_REQUEST, "지원하지 않는 안건 상태입니다."),
    INVALID_AGENDA(10, HttpStatus.NOT_FOUND, "존재하지 않는 답해요 안건입니다."),
    AGENDA_PARTICIPATION_NOT_FOUND(11, HttpStatus.NOT_FOUND, "해당 답해요 안건에 대해 참여 내역이 없습니다."),
    FORBIDDEN_UNIVERSITY_ACCESS(12, HttpStatus.FORBIDDEN, "대학교 정보 불일치로 인해 접근이 거부되었습니다."),
    ALREADY_PARTICIPATED(13, HttpStatus.BAD_REQUEST, "이미 참여한 답해요 안건입니다."),
    NOT_PARTICIPATED(14, HttpStatus.BAD_REQUEST, "참여하지 않은 답해요 안건입니다."),
    AGENDA_NOT_STARTED(15, HttpStatus.BAD_REQUEST, "아직 진행 전인 답해요 안건입니다."),
    AGENDA_CLOSED(16, HttpStatus.BAD_REQUEST, "종료된 답해요 안건입니다."),
    AGENDA_DELETED(17, HttpStatus.BAD_REQUEST, "삭제된 답해요 안건입니다."),
    ECHO_SEND_FAIL(18, HttpStatus.INTERNAL_SERVER_ERROR, "답해요 메아리 전송에 실패했습니다"),
    // Opinion
    INVALID_OPINION_TYPE(19, HttpStatus.BAD_REQUEST, "잘못된 말해요 타입입니다."),
    OPINION_COUNT_ERROR(20, HttpStatus.INTERNAL_SERVER_ERROR, "말해요 의견 수 카운트에 실패하였습니다."),
    INVALID_OPINION(21, HttpStatus.NOT_FOUND, "말해요 채팅방 조회에 실패하였습니다."),
    INVALID_OPINION_CHAT(22, HttpStatus.NOT_FOUND, "말해요 채팅 조회에 실패하였습니다."),
    INVALID_OPINION_LAST_READ(23, HttpStatus.NOT_FOUND, "말해요 마지막 읽은 채팅 id 조회에 실패하였습니다."),
    UNAUTHORIZED_OPINION_ACCESS(24, HttpStatus.FORBIDDEN, "본인이 작성한 말해요 의견이 아닙니다."),
    DELETED_OPINION(25, HttpStatus.NOT_FOUND, "삭제된 말해요 채팅방입니다."),
    ALREADY_REMINDED(26, HttpStatus.BAD_REQUEST, "이미 리마인드된 의견입니다."),
    CHAT_COUNT_LIMIT_EXCEEDED(45, HttpStatus.BAD_REQUEST, "채팅 개수를 초과하였습니다."),
    // Member
    INVALID_MEMBER(27, HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."),
    // University
    INVALID_UNIVERSITY(28, HttpStatus.NOT_FOUND, "아직 등록되지 않은 대학교입니다."),
    // Auth
    INVALID_UUID(29, HttpStatus.BAD_REQUEST, "해당 사용자의 uuid를 찾을 수 없습니다."),
    DUPLICATE_LOGIN(30, HttpStatus.CONFLICT, "다른 장치/브라우저에서 로그인하여 세션이 만료되었습니다."),
    INVALID_AUTHORITY(31, HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),
    INVALID_AUTHORIZATION_CODE(32, HttpStatus.BAD_REQUEST, "유효하지 않은 인증 코드입니다."),
    NOT_SUPPORTED_OAUTH_SERVICE(33, HttpStatus.NOT_IMPLEMENTED, "해당 OAuth 서비스는 제공하지 않습니다."),
    OAUTH_ACCESS_TOKEN_FETCH_FAILED(34, HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 어세스토큰을 받아오는 데에 실패하였습니다."),
    OAUTH_USER_INFO_FETCH_FAILED(35, HttpStatus.INTERNAL_SERVER_ERROR, "OAuth로부터 사용자 정보를 받아오는 데에 실패하였습니다."),
    TEMPLATE_FILE_READ_ERROR(36, HttpStatus.INTERNAL_SERVER_ERROR, "이메일 템플릿을 읽는 도중 오류가 발생하였습니다."),
    CODE_MISMATCH(37, HttpStatus.BAD_REQUEST, "인증코드가 일치하지 않습니다"),
    EMAIL_CODE_EXPIRED(38, HttpStatus.GONE, "이메일 인증 코드가 만료되었습니다."),
    UNIVERSITY_DOMAIN_MISMATCH(39, HttpStatus.BAD_REQUEST, "대학교 이메일과 도메인이 일치하지 않습니다."),
    INVALID_ADMIN(40, HttpStatus.NOT_FOUND, "존재하지 않는 관리자입니다."),
    PASSWORD_MISMATCH(41, HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_ACCESS_TOKEN(42, HttpStatus.UNAUTHORIZED, "올바르지 않은 형식의 AccessToken입니다."),
    REFRESH_TOKEN_MISMATCH(43, HttpStatus.UNAUTHORIZED, "리프레시 토큰이 일치하지 않습니다."),
    EXPIRED_ACCESS_TOKEN(44, HttpStatus.UNAUTHORIZED, "토큰의 유효기간이 만료되었습니다."),
    // Common
    INVALID_METHOD_ARGUMENT(46, HttpStatus.BAD_REQUEST, "유효하지 않은 입력값입니다.");



    private final HttpStatus httpStatus;
    private final String message;
    private final int code;

    ErrorCode(int code, HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.code = code;
    }
}
