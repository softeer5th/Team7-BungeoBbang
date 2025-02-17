INSERT INTO agenda (university_id, admin_id, title, start_date, end_date, content, is_end, participant_count,
                    category_type, created_at, modified_at)
VALUES
    --upcoming
    (1, 1, '학사 일정 조정 논의', DATEADD(DAY, 5, CURRENT_DATE), DATEADD(DAY, 5, CURRENT_DATE), '학사 일정 조정 논의에 대한 논의.', true,
     334, 'ACADEMICS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '기숙사 환경 개선', DATEADD(DAY, 10, CURRENT_DATE), DATEADD(DAY, 15, CURRENT_DATE), '기숙사 환경 개선에 대한 논의.', true, 304,
     'FACILITIES', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '예산 배분 논의', DATEADD(DAY, 2, CURRENT_DATE), DATEADD(DAY, 10, CURRENT_DATE), '예산 배분 논의에 대한 논의.', false, 293,
     'BUDGET', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '동아리 활동 지원', DATEADD(DAY, 3, CURRENT_DATE), DATEADD(DAY, 6, CURRENT_DATE), '동아리 활동 지원에 대한 논의.', true, 106,
     'CLUBS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '축제 기획 회의', DATEADD(DAY, 10, CURRENT_DATE), DATEADD(DAY, 20, CURRENT_DATE), '축제 기획 회의에 대한 논의.', false, 244,
     'EVENTS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- active
    (1, 1, '학생 정보 보안 강화', DATEADD(DAY, -15, CURRENT_DATE), DATEADD(DAY, 20, CURRENT_DATE), '학생 정보 보안 강화에 대한 논의.', false,
     203, 'IT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '교내 버스 노선 변경', DATEADD(DAY, -5, CURRENT_DATE), DATEADD(DAY, 12, CURRENT_DATE), '교내 버스 노선 변경에 대한 논의.', false,
     187, 'TRANSPORTATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '캠퍼스 내 와이파이 개선', DATEADD(DAY, 0, CURRENT_DATE), DATEADD(DAY, 0, CURRENT_DATE), '캠퍼스 내 와이파이 개선에 대한 논의.',
     false, 265, 'IT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '강의실 환경 개선', DATEADD(DAY, -15, CURRENT_DATE), DATEADD(DAY, 1, CURRENT_DATE), '강의실 환경 개선에 대한 논의.', true, 142,
     'FACILITIES', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '시험 일정 조정', DATEADD(DAY, -30, CURRENT_DATE), DATEADD(DAY, 40, CURRENT_DATE), '시험 일정 조정에 대한 논의.', false, 377,
     'ACADEMICS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '학생 복지 정책 개선', DATEADD(DAY, -18, CURRENT_DATE), DATEADD(DAY, 0, CURRENT_DATE), '학생 복지 정책 개선에 대한 논의.', false,
     241, 'OTHER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '기숙사 식당 메뉴 개선', DATEADD(DAY, -20, CURRENT_DATE), DATEADD(DAY, 0, CURRENT_DATE), '기숙사 식당 메뉴 개선에 대한 논의.',
     false, 189, 'FACILITIES', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- closed

    (1, 1, '등록금 납부 정책 변경', DATEADD(DAY, -15, CURRENT_DATE), DATEADD(DAY, -5, CURRENT_DATE), '등록금 납부 정책 변경에 대한 논의.',
     false, 127, 'BUDGET', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '체육 시설 확충', DATEADD(DAY, -10, CURRENT_DATE), DATEADD(DAY, -2, CURRENT_DATE), '체육 시설 확충에 대한 논의.', true, 173,
     'FACILITIES', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '강의평가 시스템 개선', DATEADD(DAY, -35, CURRENT_DATE), DATEADD(DAY, -15, CURRENT_DATE), '강의평가 시스템 개선에 대한 논의.',
     false, 211, 'ACADEMICS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 1, '동아리 방 배정 기준 변경', DATEADD(DAY, -40, CURRENT_DATE), DATEADD(DAY, -20, CURRENT_DATE), '동아리 방 배정 기준 변경에 대한 논의.',
     false, 159, 'CLUBS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
