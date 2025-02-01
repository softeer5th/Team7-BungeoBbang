-- ✅ 대학교 테이블
CREATE TABLE IF NOT EXISTS university
(

    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    name
    VARCHAR
(
    45
) NOT NULL,
    domain VARCHAR
(
    45
) NOT NULL COMMENT '도메인',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- ✅ 학생 테이블
CREATE TABLE IF NOT EXISTS member
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    login_id
    VARCHAR
(
    45
) NOT NULL COMMENT '소셜 로그인 ID',
    email VARCHAR
(
    45
) COMMENT '학생 대학 이메일',
    provider VARCHAR
(
    10
) NOT NULL CHECK
(
    provider
    IN
(
    'KAKAO',
    'GOOGLE'
)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    university_id BIGINT,
    FOREIGN KEY
(
    university_id
) REFERENCES university
(
    id
)
                                                    ON DELETE CASCADE
    );

-- ✅ 학생회 (관리자) 테이블
CREATE TABLE IF NOT EXISTS admin
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    login_id
    VARCHAR
(
    45
) NOT NULL,
    password VARCHAR
(
    255
) NOT NULL,
    name VARCHAR
(
    45
) NOT NULL COMMENT '학생회 이름, 현재 프로필이 없긴함',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    university_id BIGINT,
    FOREIGN KEY
(
    university_id
) REFERENCES university
(
    id
)
                                                    ON DELETE CASCADE
    );

-- ✅ 학생 의견 (1:1 채팅방)
CREATE TABLE IF NOT EXISTS opinion
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,  -- 기본 키 (ID)
    university_id BIGINT,  -- 대학 ID
    member_id BIGINT,      -- 회원 ID

    opinion_type ENUM('IMPROVEMENT', 'NEED', 'SUGGESTION', 'INQUIRY') NOT NULL,  -- 의견 타입 (ENUM)
    category_type ENUM('ACADEMICS', 'FACILITIES', 'BUDGET', 'CLUBS', 'EVENTS', 'IT', 'TRANSPORTATION', 'OTHER') NOT NULL,  -- 카테고리 타입 (ENUM)

    is_remind BOOLEAN NOT NULL COMMENT '리마인드 여부',  -- 리마인드 여부 (BOOLEAN)
    chat_count INT NOT NULL COMMENT '채팅 보낸 횟수',    -- 채팅 보낸 횟수

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 생성일 (현재 시간 자동)
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 수정일 (수정 시 자동 갱신)

    FOREIGN KEY (university_id) REFERENCES university(id) ON DELETE CASCADE,  -- 대학 테이블과의 관계
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE  -- 회원 테이블과의 관계
);

-- ✅ 답해요 (안건) 테이블
CREATE TABLE IF NOT EXISTS agenda
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    university_id
    BIGINT,
    admin_id
    BIGINT,
    title
    VARCHAR
(
    45
) NOT NULL COMMENT '안건 이름',
    start_date DATE NOT NULL COMMENT '시작 날짜',
    end_date DATE NOT NULL COMMENT '마감 날짜',
    content VARCHAR
(
    1000
),
    is_end BOOLEAN NOT NULL COMMENT '종료 여부',
    count INT NOT NULL COMMENT '답해요 참여 수, 채팅방을 나가도 줄어들지 않음',
    category VARCHAR
(
    20
) NOT NULL CHECK
(
    category
    IN
(
     'ACADEMICS',
     'FACILITIES',
     'BUDGET',
     'CLUBS',
     'EVENTS',
     'IT',
     'TRANSPORTATION',
     'OTHER'
)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY
(
    university_id
) REFERENCES university
(
    id
)
                                                    ON DELETE CASCADE,
    FOREIGN KEY
(
    admin_id
) REFERENCES admin
(
    id
)
                                                    ON DELETE CASCADE
    );

-- ✅ 안건 이미지 테이블
CREATE TABLE IF NOT EXISTS agenda_image
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    agenda_id
    BIGINT,
    path
    VARCHAR
(
    255
) NOT NULL,
    FOREIGN KEY
(
    agenda_id
) REFERENCES agenda
(
    id
) ON DELETE CASCADE
    );

-- ✅ 답해요 채팅방 참여 테이블
CREATE TABLE IF NOT EXISTS agenda_member
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    agenda_id
    BIGINT,
    member_id
    BIGINT,
    FOREIGN
    KEY
(
    agenda_id
) REFERENCES agenda
(
    id
) ON DELETE CASCADE,
    FOREIGN KEY
(
    member_id
) REFERENCES member
(
    id
)
  ON DELETE CASCADE
    );


-- 대학 정보 삽입
INSERT INTO university (name, domain)
VALUES ('서울대학교', 'snu.ac.kr');
INSERT INTO university (name, domain)
VALUES ('고려대학교', 'korea.ac.kr');

-- 관리자 계정 추가 (비밀번호는 Bcrypt 해시된 값)
INSERT INTO admin (login_id, name, password, university_id)
VALUES ('admin', '관리자', '$2a$10$8O1QVz06uF47OVPa.lpZxO5ErUzG1OShT/1rb.gET4cZ4IjxEnlU.', 1);

-- Agenda 더미 데이터 삽입 (카테고리 영문 수정)
INSERT INTO agenda (university_id, admin_id, title, start_date, end_date, content, is_end, count, category)
VALUES
    (1, 1, '2024 1학기 학사일정 논의', '2024-01-02', '2024-01-31', '2024학년도 1학기 일정에 대한 논의입니다.', FALSE, 50, 'ACADEMICS'),
    (1, 1, '기숙사 시설 개선 요구', '2024-02-02', '2024-02-15', '기숙사 내 시설 개선 요구 사항 정리.', FALSE, 30, 'FACILITIES'),
    (1, 1, '예산 증액 필요성 조사', '2024-03-02', '2024-03-15', '학과별 추가 예산 요청 필요성을 검토합니다.', TRUE, 40, 'BUDGET'),
    (2, 1, '2024 동아리 활동 지원', '2024-04-02', '2024-04-30', '동아리 지원 방안 및 예산 논의.', FALSE, 25, 'CLUBS'),
    (2, 1, '학교 축제 일정 확정', '2024-05-10', '2024-05-20', '2024년도 학교 축제 일정 논의.', FALSE, 100, 'EVENTS'),
    (2, 1, 'Wi-Fi 성능 개선 요청', '2024-06-01', '2024-06-15', '교내 Wi-Fi 성능 및 연결 안정성 논의.', TRUE, 35, 'IT'),
    (1, 1, '교내 셔틀버스 노선 조정', '2024-07-01', '2024-07-15', '셔틀버스 노선 및 운행시간 개선.', FALSE, 20, 'TRANSPORTATION'),
    (2, 1, '기타 의견 수렴', '2024-08-01', '2024-08-31', '기타 의견 및 건의 사항 수집.', TRUE, 15, 'OTHER');

-- ✅ 학생 (회원) 더미 데이터 삽입
INSERT INTO member (login_id, email, provider, university_id)
VALUES
    ('student_01', 'student01@snu.ac.kr', 'KAKAO', 1),
    ('student_02', 'student02@snu.ac.kr', 'GOOGLE', 1),
    ('student_03', 'student03@snu.ac.kr', 'KAKAO', 1),
    ('student_04', 'student04@snu.ac.kr', 'GOOGLE', 1),
    ('student_05', 'student05@snu.ac.kr', 'KAKAO', 1),
    ('student_06', 'student06@snu.ac.kr', 'GOOGLE', 1),
    ('student_07', 'student07@snu.ac.kr', 'KAKAO', 1),
    ('student_08', 'student08@snu.ac.kr', 'GOOGLE', 1),
    ('student_09', 'student09@snu.ac.kr', 'KAKAO', 1),
    ('student_10', 'student10@snu.ac.kr', 'GOOGLE', 1);


-- ✅ 학생 의견 (1:1 채팅방) 더미 데이터 삽입
INSERT INTO opinion (university_id, member_id, opinion_type, category_type, is_remind, chat_count, created_at)
VALUES
    (1, 1, 'IMPROVEMENT', 'ACADEMICS', FALSE, 5, '2025-01-10 12:00:00'),
    (1, 1, 'NEED', 'FACILITIES', TRUE, 10, '2025-01-12 13:30:00'),
    (1, 1, 'SUGGESTION', 'BUDGET', FALSE, 3, '2025-01-15 14:45:00'),
    (1, 1, 'INQUIRY', 'CLUBS', TRUE, 7, '2025-01-18 09:00:00'),
    (1, 1, 'IMPROVEMENT', 'EVENTS', FALSE, 4, '2025-01-20 10:30:00'),
    (1, 1, 'NEED', 'IT', TRUE, 12, '2025-01-22 11:15:00'),
    (1, 1, 'SUGGESTION', 'TRANSPORTATION', FALSE, 6, '2025-01-25 13:00:00'),
    (1, 1, 'INQUIRY', 'OTHER', TRUE, 8, '2025-01-28 14:30:00'),
    (1, 1, 'IMPROVEMENT', 'ACADEMICS', FALSE, 9, '2025-01-29 15:00:00'),
    (1, 1, 'NEED', 'FACILITIES', TRUE, 2, '2025-02-01 16:00:00');