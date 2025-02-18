delete
from agenda
where id > 0;
delete
from member
where id > 0;
delete
from admin
where id > 0;
delete
from university
where id > 0;

INSERT INTO university (id, name, domain, created_at, modified_at)
VALUES (1, '네이버대학교', 'naver.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO admin (id, login_id, name, password, university_id, created_at, modified_at)
VALUES (1, 'admin', '관리자', '$2a$10$8O1QVz06uF47OVPa.lpZxO5ErUzG1OShT/1rb.gET4cZ4IjxEnlU.', 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);


INSERT INTO agenda (id, university_id, admin_id, title, start_date, end_date, content, is_end, participant_count,
                    category_type, created_at, modified_at)
VALUES (1, 1, 1, '학생 정보 보안 강화', DATEADD(DAY, -15, CURRENT_DATE), DATEADD(DAY, 20, CURRENT_DATE), '학생 정보 보안 강화에 대한 논의.',
        false,
        203, 'IT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO member (id, login_id, email, provider, university_id, created_at, modified_at)
SELECT X,
       'login_id_' || X,
       'member' || X || '@naver.com',
       'KAKAO',
       1,
       CURRENT_TIMESTAMP,
       CURRENT_TIMESTAMP
FROM SYSTEM_RANGE(1, 100);

