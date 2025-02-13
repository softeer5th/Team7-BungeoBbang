INSERT INTO university (id, name, domain, created_at, modified_at)
VALUES (1, '네이버대학교', 'naver.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO admin (id, login_id, name, password, university_id, created_at, modified_at)
VALUES (1, 'admin', '관리자', '$2a$10$8O1QVz06uF47OVPa.lpZxO5ErUzG1OShT/1rb.gET4cZ4IjxEnlU.', 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);

INSERT INTO agenda (id, university_id, admin_id, title, start_date, end_date, content, is_end, participant_count,
                    category_type, created_at, modified_at)
VALUES (1, 1, 1, '학사 일정 조정 논의', '2025-02-10', '2025-02-27', '학사 일정 조정 논의에 대한 논의.', false, 0, 'ACADEMICS',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO member (id, login_id, email, provider, university_id, created_at, modified_at)
VALUES (1, 'login_id1', 'test1@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'login_id2', 'test2@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 'login_id3', 'test3@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (4, 'login_id4', 'test4@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (5, 'login_id5', 'test5@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (6, 'login_id6', 'test6@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (7, 'login_id7', 'test7@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (8, 'login_id8', 'test8@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (9, 'login_id9', 'test9@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (10, 'login_id10', 'test10@naver.com', 'KAKAO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
