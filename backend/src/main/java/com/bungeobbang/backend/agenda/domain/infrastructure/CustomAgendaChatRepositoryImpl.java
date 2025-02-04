package com.bungeobbang.backend.agenda.domain.infrastructure;

import com.bungeobbang.backend.agenda.domain.repository.CustomAgendaChatRepository;
import com.bungeobbang.backend.agenda.dto.response.LastChat;
import com.bungeobbang.backend.agenda.dto.response.LastReadChat;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <h2>CustomAgendaChatRepositoryImpl</h2>
 * <p>QueryDSL을 이용한 커스텀 답해요(Ageanda) 조회 Repository 구현체</p>
 * <p>안건 목록을 상태별(예정, 진행 중, 종료됨)로 조회하며, 무한 스크롤을 지원합니다.</p>
 *
 * @author [zoouniak]
 * @version 1.0
 */
@Repository
@RequiredArgsConstructor
public class CustomAgendaChatRepositoryImpl implements CustomAgendaChatRepository {
    private final static String AGENDA_COLLECTION = "agenda_chat";
    private final static String AGENDA_LAST_READ_COLLECTION = "agenda_chat_last_read";
    private final MongoTemplate mongoTemplate;

    /**
     * <h3>MongoDB에서 각 채팅방의 최신 메시지를 조회</h3>
     * <p>사용자가 참여한 채팅방(agendaId) 목록을 받아, 각 채팅방에서 최신 메시지를 가져옵니다.</p>
     *
     * @param agendaIdList 사용자가 참여한 채팅방의 ID 목록
     * @param memberId     사용자 ID (자신이 보낸 메시지 또는 관리자 메시지를 조회)
     * @return 각 채팅방에서 가장 최신 메시지 (LastChat 객체 목록)
     */
    @Override
    public List<LastChat> findLastChats(List<Long> agendaIdList, Long memberId) {
        // Match - 주어진 agendaId 리스트와 memberId 필터링
        MatchOperation matchStage = Aggregation.match(
                new Criteria("agendaId").in(agendaIdList)
                        .orOperator(
                                Criteria.where("memberId").is(memberId),
                                Criteria.where("isAdmin").is(true)
                        )
        );

        // Sort - 최신 메시지 순으로 정렬
        SortOperation sortStage = Aggregation.sort(org.springframework.data.domain.Sort.Direction.DESC, "_id");

        // Group - 각 채팅방(agendaId)별 최신 메시지 1개만 가져오기
        GroupOperation groupStage = Aggregation.group("agendaId")
                .first("$$ROOT").as("lastChat");

        // Project - lastChat에서 _id, chat, createdAt만 유지
        ProjectionOperation projectStage = Aggregation.project()
                .and("_id").as("agendaId")  // 원래 _id를 agendaId로 매핑
                .and("lastChat._id").as("chatId")
                .and("lastChat.chat").as("content")
                .and("lastChat.createdAt").as("createdAt");

        // 최종 정렬 - lastChat._id 기준 정렬
        SortOperation finalSortStage = Aggregation.sort(Sort.Direction.DESC, "chatId");

        // Aggregation 실행
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                sortStage,
                groupStage,
                projectStage,
                finalSortStage
        );

        return mongoTemplate.aggregate(aggregation, AGENDA_COLLECTION, LastChat.class).getMappedResults();
    }

    @Override
    public LastChat findLastChat(Long agendaId, Long memberId) {
        // Match - 주어진 agendaId 리스트와 memberId 필터링
        MatchOperation matchStage = Aggregation.match(
                new Criteria("agendaId").in(agendaId)
                        .orOperator(
                                Criteria.where("memberId").is(memberId),
                                Criteria.where("isAdmin").is(true)
                        )
        );

        // Sort - 최신 메시지 순으로 정렬
        SortOperation sortStage = Aggregation.sort(org.springframework.data.domain.Sort.Direction.DESC, "_id");

        // Group - 각 채팅방(agendaId)별 최신 메시지 1개만 가져오기
        GroupOperation groupStage = Aggregation.group("agendaId")
                .first("$$ROOT").as("lastChat");


        // Project - lastChat에서 _id, chat, createdAt만 유지
        ProjectionOperation projectStage = Aggregation.project()
                .and("_id").as("agendaId")  // 원래 _id를 agendaId로 매핑
                .and("lastChat._id").as("chatId")
                .and("lastChat.chat").as("content")
                .and("lastChat.createdAt").as("createdAt");


        // Aggregation 실행
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                sortStage,
                groupStage,
                projectStage
        );

        return mongoTemplate.aggregate(aggregation, AGENDA_COLLECTION, LastChat.class).getUniqueMappedResult();
    }

    /**
     * <h3>MongoDB에서 특정 사용자의 마지막 읽은 채팅 ID 조회</h3>
     * <p>특정 채팅방(agendaId)에서 사용자가 마지막으로 읽은 메시지 ID를 조회합니다.</p>
     *
     * @param agendaId 조회할 채팅방의 ID
     * @param memberId 사용자 ID
     * @return 마지막으로 읽은 채팅 ID (없으면 null 반환)
     */
    @Override
    public ObjectId findLastReadChat(Long agendaId, Long memberId) {
        // Match - 특정 agendaId와 memberId 필터링
        MatchOperation matchStage = Aggregation.match(
                Criteria.where("agendaId").is(agendaId)
                        .and("memberId").is(memberId)
        );

        // Project - 필요한 필드만 선택
        ProjectionOperation projectStage = Aggregation.project()
                .and("lastReadChatId").as("chatId");

        // Aggregation 실행
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                projectStage
        );

        final LastReadChat lastReadChat = mongoTemplate.aggregate(aggregation, AGENDA_LAST_READ_COLLECTION, LastReadChat.class).getUniqueMappedResult();

        // 값이 없으면 null 반환
        System.out.println(lastReadChat == null);
        return lastReadChat != null ? lastReadChat.chatId() : null;
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
    public void saveLastReadChat(Long agendaId, Long memberId, ObjectId lastChatId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("memberId").is(memberId)
                .and("agendaId").is(agendaId));

        Update update = new Update();
        update.set("lastReadChatId", lastChatId);
        update.setOnInsert("memberId", memberId); // 삽입될 경우 기본값 설정
        update.setOnInsert("agendaId", agendaId);

        mongoTemplate.upsert(query, update, "agenda_chat_last_read"); // upsert 사용
    }

}
