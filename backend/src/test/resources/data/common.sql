INSERT INTO university (id, name, domain, created_at, modified_at)
VALUES (1, '서울대학교', 'snu.ac.kr', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO admin (id, login_id, name, password, university_id, created_at, modified_at)
VALUES (1, 'admin', '관리자', '$2a$10$8O1QVz06uF47OVPa.lpZxO5ErUzG1OShT/1rb.gET4cZ4IjxEnlU.', 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);

INSERT INTO member (login_id, email, provider, university_id, created_at, modified_at)
values ('login_id', 'jueun1025@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
