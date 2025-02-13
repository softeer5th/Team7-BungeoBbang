package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.AgendaAdminLastReadChat;
import com.bungeobbang.backend.agenda.domain.AgendaChat;
import com.bungeobbang.backend.agenda.domain.repository.AdminAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.AdminAgendaSubResult;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
public class AdminAgendaChatRepositoryImpl implements AdminAgendaChatRepository {
    private final static String AGENDA_COLLECTION = "agenda_chat";
    private final static String AGENDA_LAST_READ_COLLECTION = "agenda_last_read_chat";
    private final static String AGENDA_ID = "agendaId";
    private final static String ADMIN_ID = "adminId";
    private static final String LAST_CHAT = "lastChat";
    private static final String LAST_READ_CHAT_ID = "lastReadChatId";
    private static final String ABOVE = "above";
    private static final String BELOW = "below";
    private static final String ID = "_id";
    private final MongoTemplate mongoTemplate;
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private static final ObjectId MIN_OBJECT_ID = new ObjectId("000000000000000000000000");

    @Override
    public AgendaChat findLastChat(Long agendaId) {
        Query query = new Query();

        // 조건 설정
        query.addCriteria(Criteria.where(AGENDA_ID).is(agendaId));
        // 내림차순 정렬 (_id가 가장 큰 것)
        query.with(Sort.by(Sort.Direction.DESC, ID));

        // 하나의 문서만 가져오기 (limit 1)
        query.limit(1);

        return mongoTemplate.findOne(query, AgendaChat.class);
    }

    public Map<Long, AdminAgendaSubResult> findUnreadStatus(List<Long> agendaIdList, Long adminId) {
        Map<Long, AdminAgendaSubResult> result = new HashMap<>();

        // ✅ 1. 최신 채팅 가져오기 (각 agendaId별로 _id가 가장 큰 값)
        MatchOperation matchStage = Aggregation.match(Criteria.where(AGENDA_ID).in(agendaIdList));
        SortOperation sortStage = Aggregation.sort(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "_id"));
        GroupOperation groupStage = Aggregation.group(AGENDA_ID)
                .first("$$ROOT").as(LAST_CHAT);

        // Project - lastChat에서 _id, chat, createdAt만 유지
        ProjectionOperation projectStage = Aggregation.project()
                .and(ID).as(LastChat.AGENDA_ID)  // 원래 _id를 agendaId로 매핑
                .and("lastChat._id").as(LastChat.CHAT_ID)
                .and("lastChat.chat").as(LastChat.CONTENT)
                .and("lastChat.createdAt").as(LastChat.CREATED_AT);

        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                sortStage,
                groupStage,
                projectStage);

        AggregationResults<LastChat> lastChatsResult = mongoTemplate.aggregate(aggregation, AGENDA_COLLECTION, LastChat.class);

        List<LastChat> lastChats = lastChatsResult.getMappedResults();

        // ✅ 2. 모든 agendaId에 대한 lastReadChatId 조회
        List<AgendaAdminLastReadChat> lastReadChats = mongoTemplate.find(
                new org.springframework.data.mongodb.core.query.Query(
                        Criteria.where(AGENDA_ID).in(agendaIdList)
                                .and(ADMIN_ID).is(adminId)
                ), AgendaAdminLastReadChat.class);

        // ✅ 3. 결과를 Map 형태로 변환
        Map<Long, ObjectId> lastChatMap = lastChats.stream()
                .collect(Collectors.toMap(LastChat::agendaId, LastChat::chatId, (a, b) -> b));

        Map<Long, ObjectId> lastReadChatMap = lastReadChats.stream()
                .collect(Collectors.toMap(AgendaAdminLastReadChat::getAgendaId, AgendaAdminLastReadChat::getLastReadChatId, (a, b) -> b));

        // ✅ 4. 최종 결과 계산
        for (Long agendaId : agendaIdList) {
            ObjectId lastChatId = lastChatMap.getOrDefault(agendaId, MIN_OBJECT_ID);
            ObjectId lastReadChatId = lastReadChatMap.getOrDefault(agendaId, MIN_OBJECT_ID);

            result.put(agendaId, new AdminAgendaSubResult(lastChatId.compareTo(lastReadChatId) > 0, lastReadChatId));
        }
        return result;
    }

    public void upsertAdminLastReadChat(Long agendaId, Long adminId, ObjectId lastChatId) {
        Query query = new Query();
        query.addCriteria(Criteria.where(ADMIN_ID).is(adminId)
                .and(AGENDA_ID).is(agendaId));

        Update update = new Update();
        update.set(LAST_READ_CHAT_ID, lastChatId);
        update.setOnInsert(ADMIN_ID, adminId); // 삽입될 경우 기본값 설정
        update.setOnInsert(AGENDA_ID, agendaId);

        mongoTemplate.upsert(query, update, AGENDA_LAST_READ_COLLECTION);
    }

    @Override
    public List<AgendaChat> findChatsByScroll(Long agendaId, ObjectId chatId, ScrollType scrollType) {
        Query query = new Query();
        query.addCriteria(Criteria.where(AGENDA_ID).is(agendaId));

        if (scrollType == null) {
            // 마지막 읽은 채팅을 기준으로 위로 10개 + 아래료 10개
            return findChatsAround(agendaId, chatId);
        }

        switch (scrollType) {
            case DOWN -> query.addCriteria(Criteria.where(ID).gt(chatId));
            case UP -> query.addCriteria(Criteria.where(ID).lt(chatId));
        }
        query.with(Sort.by(Sort.Direction.ASC, ID));
        query.limit(10);
        return mongoTemplate.find(query, AgendaChat.class);
    }

    private List<AgendaChat> findChatsAround(Long agendaId, ObjectId chatId) {
        if (chatId == MAX_OBJECT_ID) {
            Query query = new Query();
            query.addCriteria(Criteria.where(AGENDA_ID).is(agendaId));
            query.with(Sort.by(Sort.Direction.ASC, ID));
            query.limit(10);

            return mongoTemplate.find(query, AgendaChat.class);
        }

        // 위쪽 10개
        AggregationOperation matchAbove = Aggregation.match(
                Criteria.where(AGENDA_ID).is(agendaId).and(ID).lt(chatId));
        AggregationOperation sortAbove = Aggregation.sort(Sort.Direction.DESC, ID); // 최신순
        AggregationOperation limitAbove = Aggregation.limit(10);
        AggregationOperation lastSort = Aggregation.sort(Sort.by(Sort.Direction.ASC, ID));

        // 아래쪽 10개 (_id >= chatId)
        AggregationOperation matchBelow = Aggregation.match(
                Criteria.where(AGENDA_ID).is(agendaId).and(ID).gte(chatId));
        AggregationOperation sortBelow = Aggregation.sort(Sort.Direction.ASC, ID); // 오래된 순
        AggregationOperation limitBelow = Aggregation.limit(10);

        final FacetOperation facets = new FacetOperation()
                .and(matchAbove, sortAbove, limitAbove, lastSort).as(ABOVE)
                .and(matchBelow, sortBelow, limitBelow).as(BELOW);
        Aggregation aggregation = Aggregation.newAggregation(facets);
        AggregationResults<ChatsFacetResult> result = mongoTemplate.aggregate(aggregation, AGENDA_COLLECTION, ChatsFacetResult.class);

        if (result.getMappedResults().isEmpty()) {
            return new ArrayList<>();
        }
        List<AgendaChat> aboveChats = new ArrayList<>(result.getMappedResults().get(0).above);
        List<AgendaChat> belowChats = result.getMappedResults().get(0).below;

        // 위쪽 + 아래쪽 합치기
        aboveChats.addAll(belowChats);
        return aboveChats;
    }

    // $facet 결과를 매핑하기 위한 DTO
    private static class ChatsFacetResult {
        private List<AgendaChat> above;
        private List<AgendaChat> below;
    }
}
