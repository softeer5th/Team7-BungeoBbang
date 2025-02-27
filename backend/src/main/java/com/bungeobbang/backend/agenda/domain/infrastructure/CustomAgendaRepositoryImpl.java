package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaRepository;
import com.bungeobbang.backend.agenda.dto.MemberAgendaSubResult;
import com.bungeobbang.backend.agenda.dto.response.AgendaResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.bungeobbang.backend.agenda.domain.QAgenda.agenda;
import static com.bungeobbang.backend.agenda.domain.QAgendaMember.agendaMember;

/**
 * <h2>CustomAgendaRepositoryImpl</h2>
 * <p>QueryDSL을 이용한 커스텀 답해요(Ageanda) 조회 Repository 구현체</p>
 * <p>안건 목록을 상태별(예정, 진행 중, 종료됨)로 조회하며, 무한 스크롤을 지원합니다.</p>
 *
 * @author [zoouniak]
 * @version 1.0
 */
@Repository
@RequiredArgsConstructor
public class CustomAgendaRepositoryImpl implements CustomAgendaRepository {
    private final JPAQueryFactory queryFactory;
    private final int AGENDA_SIZE = 8; // 페이지당 조회할 답해요 개수

    /**
     * <h3>예정된 안건 목록 조회</h3>
     * <p>현재 날짜 기준으로 아직 시작되지 않은 안건 목록을 조회합니다.</p>
     *
     * @param universityId 대학교 ID (필수)
     * @param endDate      마지막으로 조회된 안건의 종료 날짜 (무한 스크롤을 위한 커서)
     * @param agendaId     마지막으로 조회된 안건의 ID (중복 방지 및 페이징용)
     * @return 예정된 안건 목록 (최대 8개)
     */
    @Override
    public List<AgendaResponse> getUpcomingAgendas(Long universityId, LocalDate endDate, Long agendaId) {
        return queryFactory.select(Projections.constructor(AgendaResponse.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(agenda.startDate.gt(LocalDate.now())) // 시작 전 상태
                                .and(gtEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤
                )
                .orderBy(agenda.endDate.asc(), agenda.id.asc()) // 종료 날짜 오름차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }

    @Override
    public List<MemberAgendaSubResult> getUpcomingAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId) {
        return queryFactory.select(Projections.constructor(MemberAgendaSubResult.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count,
                        queryFactory.select(agendaMember.id)
                                .from(agendaMember)
                                .where(agendaMember.agenda.id.eq(agenda.id)
                                        .and(agendaMember.member.id.eq(memberId))
                                        .and(agendaMember.isDeleted.not()))
                                .exists()
                ))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(agenda.startDate.gt(LocalDate.now())) // 시작 전 상태
                                .and(gtEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤
                )
                .orderBy(agenda.endDate.asc(), agenda.id.asc()) // 종료 날짜 오름차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }

    /**
     * <h3>진행 중인 안건 목록 조회</h3>
     * <p>현재 날짜 기준으로 진행 중(시작됨~종료 전)인 안건 목록을 조회합니다.</p>
     *
     * @param universityId 대학교 ID (필수)
     * @param endDate      마지막으로 조회된 안건의 종료 날짜 (무한 스크롤을 위한 커서)
     * @param agendaId     마지막으로 조회된 안건의 ID (중복 방지 및 페이징용)
     * @return 진행 중인 안건 목록 (최대 8개)
     */
    @Override
    public List<AgendaResponse> getActiveAgendas(Long universityId, LocalDate endDate, Long agendaId) {
        return queryFactory.select(Projections.constructor(AgendaResponse.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count
                ))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(agenda.startDate.loe(LocalDate.now())) // 이미 시작됨
                                .and(agenda.endDate.goe(LocalDate.now())) // 아직 종료되지 않음
                                .and(agenda.isEnd.not()) // 종료되지 않음
                                .and(gtEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤
                )
                .orderBy(agenda.endDate.asc(), agenda.id.asc()) // 종료 날짜 오름차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }

    public List<MemberAgendaSubResult> getActiveAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId) {
        return queryFactory.select(Projections.constructor(MemberAgendaSubResult.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count,
                        queryFactory.select(agendaMember.id)
                                .from(agendaMember)
                                .where(agendaMember.agenda.id.eq(agenda.id)
                                        .and(agendaMember.member.id.eq(memberId))
                                        .and(agendaMember.isDeleted.not())
                                )
                                .exists()

                ))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(agenda.startDate.loe(LocalDate.now())) // 이미 시작됨
                                .and(agenda.endDate.goe(LocalDate.now())) // 아직 종료되지 않음
                                .and(agenda.isEnd.not())
                                .and(gtEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤
                )
                .orderBy(agenda.endDate.asc(), agenda.id.asc()) // 종료 날짜 오름차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }

    /**
     * <h3>종료된 안건 목록 조회</h3>
     * <p>현재 날짜 기준으로 이미 종료된 안건 목록을 조회합니다.</p>
     *
     * @param universityId 대학교 ID (필수)
     * @param endDate      마지막으로 조회된 안건의 종료 날짜 (무한 스크롤을 위한 커서)
     * @param agendaId     마지막으로 조회된 안건의 ID (중복 방지 및 페이징용)
     * @return 종료된 안건 목록 (최대 8개)
     */
    @Override
    public List<AgendaResponse> getClosedAgendas(Long universityId, LocalDate endDate, Long agendaId) {
        return queryFactory.select(Projections.constructor(AgendaResponse.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count
                ))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(
                                        agenda.endDate.lt(LocalDate.now())
                                                .or(agenda.isEnd)
                                ) // 종료된 상태

                                .and(ltEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤

                )
                .orderBy(agenda.endDate.desc(), agenda.id.asc()) // 종료 날짜 내림차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }

    public List<MemberAgendaSubResult> getClosedAgendasWithParticipation(Long universityId, LocalDate endDate, Long agendaId, Long memberId) {
        return queryFactory.select(Projections.constructor(MemberAgendaSubResult.class,
                        agenda.id,
                        agenda.categoryType,
                        agenda.title,
                        agenda.startDate,
                        agenda.endDate,
                        agenda.count,
                        queryFactory.select(agendaMember.id)
                                .from(agendaMember)
                                .where(agendaMember.agenda.id.eq(agenda.id)
                                        .and(agendaMember.member.id.eq(memberId))
                                        .and(agendaMember.isDeleted.not()))
                                .exists()
                ))
                .from(agenda)
                .where(
                        agenda.university.id.eq(universityId)
                                .and(
                                        agenda.endDate.lt(LocalDate.now())
                                                .or(agenda.isEnd)
                                ) // 종료된 상태

                                .and(ltEndDateOrEqEndDateAndGtId(endDate, agendaId)) // 무한 스크롤
                )
                .orderBy(agenda.endDate.desc(), agenda.id.asc()) // 종료 날짜 내림차순 정렬
                .limit(AGENDA_SIZE) // 페이지 사이즈 제한
                .fetch();
    }


    /**
     * <h3>커서 기반 무한 스크롤 지원 - 종료 날짜 기준 조회</h3>
     * <p>마지막으로 조회한 `endDate`보다 최신인 안건을 가져옵니다.</p>
     *
     * @param endDate  마지막 조회된 안건의 종료 날짜
     * @param agendaId 마지막 조회된 안건의 ID
     * @return BooleanExpression - 조건식 반환
     */
    private BooleanExpression gtEndDateOrEqEndDateAndGtId(LocalDate endDate, Long agendaId) {
        if (endDate == null && agendaId == null) {
            return null;
        }
        return agenda.endDate.gt(endDate).or(agenda.endDate.eq(endDate).and(agenda.id.gt(agendaId)));
    }

    /**
     * <h3>커서 기반 무한 스크롤 지원 - 종료 날짜 기준 조회 (과거 데이터)</h3>
     * <p>마지막으로 조회한 `endDate`보다 오래된 안건을 가져옵니다.</p>
     *
     * @param endDate  마지막 조회된 안건의 종료 날짜
     * @param agendaId 마지막 조회된 안건의 ID
     * @return BooleanExpression - 조건식 반환
     */
    private BooleanExpression ltEndDateOrEqEndDateAndGtId(LocalDate endDate, Long agendaId) {
        if (endDate == null && agendaId == null) {
            return null;
        }
        return agenda.endDate.lt(endDate).or(agenda.endDate.eq(endDate).and(agenda.id.gt(agendaId)));
    }
}
