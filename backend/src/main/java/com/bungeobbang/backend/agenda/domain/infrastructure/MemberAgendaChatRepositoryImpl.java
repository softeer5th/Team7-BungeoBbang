package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.AgendaLastReadChat;
import com.bungeobbang.backend.agenda.domain.repository.MemberAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.AgendaLatestChat;
import com.bungeobbang.backend.agenda.dto.LastChat;
import com.bungeobbang.backend.common.type.ScrollType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.bungeobbang.backend.common.type.ScrollType.INITIAL;
import static com.bungeobbang.backend.common.type.ScrollType.UP;
import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;

/**
 * <h2>CustomAgendaChatRepositoryImpl</h2>
 * <p>QueryDSL을 이용한 커스텀 답해요(Ageanda) 조회 Repository 구현체</p>
 * <p>안건 목록을 상태별(예정, 진행 중, 종료됨)로 조회하며, 무한 스크롤을 지원합니다.</p>
 *
 * @author [zoouniak]
 * @version 1.0
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class MemberAgendaChatRepositoryImpl implements MemberAgendaChatRepository {
    private final static String AGENDA_COLLECTION = "agenda_chat";
    private final static String AGENDA_LAST_READ_COLLECTION = "agenda_last_read_chat";
    private final static String AGENDA_ID = "agendaId";
    private final static String MEMBER_ID = "memberId";
    private static final String IS_ADMIN = "isAdmin";
    private static final String LAST_CHAT = "lastChat";
    private static final String LAST_READ_CHAT_ID = "lastReadChatId";
    private static final String ID = "_id";
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private static final ObjectId MIN_OBJECT_ID = new ObjectId("000000000000000000000000");
    private final MongoTemplate mongoTemplate;

    @Override
    public List<AgendaLatestChat> findLastChats(List<Long> agendaIdList, Long memberId) {
        // Match - 주어진 agendaId 리스트와 memberId 필터링
        MatchOperation matchStage = Aggregation.match(
                new Criteria(AGENDA_ID).in(agendaIdList)
                        .orOperator(
                                Criteria.where(MEMBER_ID).is(memberId),
                                Criteria.where(IS_ADMIN).is(true)
                        )
        );

        // Sort - 최신 메시지 순으로 정렬
        SortOperation sortStage = Aggregation.sort(Sort.Direction.DESC, "_id");

        // Group - 각 채팅방(agendaId)별 최신 메시지 1개만 가져오기
        GroupOperation groupStage = Aggregation.group(AGENDA_ID)
                .first("$$ROOT").as(LAST_CHAT);

        // Project - lastChat에서 _id, chat, createdAt만 유지
        ProjectionOperation projectStage = Aggregation.project()
                .and(ID).as(LastChat.AGENDA_ID)  // 원래 _id를 agendaId로 매핑
                .and("lastChat._id").as(LastChat.CHAT_ID)
                .and("lastChat.chat").as(LastChat.CONTENT)
                .and("lastChat.createdAt").as(LastChat.CREATED_AT);

        SortOperation finalSortStage = Aggregation.sort(Sort.Direction.DESC, LastChat.CHAT_ID);
        // Aggregation 실행
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                sortStage,
                groupStage,
                projectStage,
                finalSortStage
        );

        final List<LastChat> lastChats = mongoTemplate.aggregate(aggregation, AGENDA_COLLECTION, LastChat.class).getMappedResults();

        List<AgendaLastReadChat> lastReadChats = mongoTemplate.find(
                new Query(
                        Criteria.where(AGENDA_ID).in(agendaIdList)
                                .and(MEMBER_ID).is(memberId)
                ), AgendaLastReadChat.class);

        Map<Long, ObjectId> lastChatMap = lastChats.stream()
                .collect(Collectors.toMap(LastChat::agendaId, LastChat::chatId, (a, b) -> b));

        Map<Long, ObjectId> lastReadChatMap = lastReadChats.stream()
                .collect(Collectors.toMap(AgendaLastReadChat::getAgendaId, AgendaLastReadChat::getLastReadChatId, (a, b) -> b));

        Map<Long, Boolean> unreadMap = new HashMap<>();
        for (Long agendaId : agendaIdList) {
            ObjectId lastChatId = lastChatMap.getOrDefault(agendaId, MIN_OBJECT_ID);
            ObjectId lastReadChatId = lastReadChatMap.getOrDefault(agendaId, MIN_OBJECT_ID);

            unreadMap.put(agendaId, lastChatId.compareTo(lastReadChatId) > 0);
        }

        return lastChats.stream()
                .map(chat -> new AgendaLatestChat(
                        chat.agendaId(),
                        chat.chatId(),
                        chat.content(),
                        chat.createdAt(),
                        unreadMap.get(chat.agendaId()),
                        lastReadChatMap.getOrDefault(chat.agendaId(), MIN_OBJECT_ID)
                ))
                .toList();
    }


    @Override
    public AgendaChat findLastChat(Long agendaId, Long memberId) {
        Query query = new Query();

        // 조건 설정
        query.addCriteria(Criteria.where(AGENDA_ID).is(agendaId)
                .orOperator(
                        Criteria.where(MEMBER_ID).is(memberId),
                        Criteria.where(IS_ADMIN).is(true)
                ));

        // 내림차순 정렬 (_id가 가장 큰 것)
        query.with(Sort.by(Sort.Direction.DESC, ID));

        // 하나의 문서만 가져오기 (limit 1)
        query.limit(1);

        return mongoTemplate.findOne(query, AgendaChat.class);
    }

    /**
     * 특정 멤버가 특정 아젠다에서 마지막으로 읽은 채팅 ID를 업데이트하거나, 문서가 없으면 새로 생성합니다.
     *
     * <p>이 메서드는 {@code agenda_chat_last_read} 컬렉션에서
     * 주어진 {@code memberId}와 {@code agendaId} 값이 일치하는 문서를 찾아
     * 해당 문서의 {@code lastReadChatId} 필드를 {@code lastChatId} 값으로 업데이트합니다.
     * 만약 일치하는 문서가 없으면 새로운 문서를 생성하여 저장합니다.</p>
     *
     * @param agendaId   업데이트할 아젠다의 고유 ID
     * @param memberId   업데이트할 멤버의 고유 ID
     * @param lastChatId 마지막으로 읽은 채팅 메시지의 ObjectId
     */
    @Override
    public void upsertLastReadChat(Long agendaId, Long memberId, ObjectId lastChatId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(MEMBER_ID).is(memberId)
                .and(AGENDA_ID).is(agendaId));

        Update update = new Update();
        update.set(LAST_READ_CHAT_ID, lastChatId);
        update.setOnInsert(MEMBER_ID, memberId); // 삽입될 경우 기본값 설정
        update.setOnInsert(AGENDA_ID, agendaId);

        mongoTemplate.upsert(query, update, AGENDA_LAST_READ_COLLECTION); // upsert 사용
    }

    @Override
    public List<AgendaChat> findChatsByScroll(Long agendaId, Long memberId, ObjectId chatId, ScrollType scrollType) {
        Query query = new Query();
        query.addCriteria(Criteria.where(AGENDA_ID).is(agendaId)
                .orOperator(
                        Criteria.where(MEMBER_ID).is(memberId),
                        Criteria.where(IS_ADMIN).is(true)
                ));

        switch (scrollType) {
            case DOWN -> {
                // 아래 방향(DOWN) 스크롤: chatId보다 큰 ID(= 더 최신 메시지) 조회
                query.addCriteria(Criteria.where(ID).gt(chatId));
                // 오름차순(ASC) 정렬 → 가장 최신의 10개 가져오기
                query.with(Sort.by(ASC, ID));
            }
            case UP -> {
                // 위 방향(UP) 스크롤: chatId보다 작은 ID(= 더 과거 메시지) 조회
                query.addCriteria(Criteria.where(ID).lt(chatId));
                // 최신 10개 가져오기 (내림차순)
                query.with(Sort.by(DESC, ID));
            }
            case INITIAL -> {
                if (!chatId.equals(MAX_OBJECT_ID)) {
                    // 초기 로드(INITIAL)에서 특정 chatId 이후의 메시지 조회
                    query.addCriteria(Criteria.where(ID).gte(chatId));
                    // 오름차순(ASC) 정렬 → 가장 최신의 10개 가져오기
                    query.with(Sort.by(ASC, ID));
                } else {
                    // MAX_OBJECT_ID인 경우, 가장 최신 메시지 10개 가져오기
                    query.with(Sort.by(DESC, ID));
                }
            }
        }

        query.limit(15);

        final List<AgendaChat> result = mongoTemplate.find(query, AgendaChat.class);

        // 위로 스크롤(UP)하거나, INITIAL 상태에서 최신 메시지를 불러오는 경우 리스트를 다시 오름차순 정렬
        if (scrollType == UP || (scrollType == INITIAL && chatId.equals(MAX_OBJECT_ID))) {
            Collections.reverse(result);
        }
        return result;
    }

    @Override
    public Map<Long, ObjectId> findAllByAgendaId(List<Long> agendaList, Long memberId) {
        Query query = new Query();
        query.addCriteria(
                Criteria.where("agendaId").in(agendaList) // agendaId가 리스트에 포함
                        .and("memberId").is(memberId)    // 특정 memberId
        );

        List<AgendaLastReadChat> results = mongoTemplate.find(query, AgendaLastReadChat.class, AGENDA_LAST_READ_COLLECTION);

        // 결과를 Map<agendaId, AgendaLastReadChat> 형태로 변환
        return results.stream().collect(Collectors.toMap(AgendaLastReadChat::getAgendaId, AgendaLastReadChat::getLastReadChatId));
    }
}
