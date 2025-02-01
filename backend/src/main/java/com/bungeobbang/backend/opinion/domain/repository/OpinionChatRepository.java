package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
public class OpinionChatRepository {
    private final MongoDatabase database;
    private final MongoCollection<Document> collection;

    public OpinionChatRepository(final MongoClient mongoClient) {
        this.database = mongoClient.getDatabase("mydatabase");
        this.collection = database.getCollection("opinion_chat");
    }

    // OpinionChat 삽입
    public void save(final OpinionChat opinionChat) {
        final Document doc = new Document()
                .append("member_id", opinionChat.getMemberId())
                .append("opinion_id", opinionChat.getOpinionId())
                .append("chat", opinionChat.getChat())
                .append("images", opinionChat.getImages())
                .append("is_admin", opinionChat.isAdmin())
                .append("created_at", opinionChat.getCreatedAt());
        collection.insertOne(doc);
    }

    public Set<Long> findDistinctOpinionIdsByAdmin() {
        final DistinctIterable<Long> distinctOpinionIds = collection.distinct(
                "opinion_id",
                new Document("is_admin", true)
                , Long.class);
        return StreamSupport.stream(distinctOpinionIds.spliterator(), false)
                .collect(Collectors.toSet()); // Set으로 수집
    }
    private OpinionChat documentToOpinionChat(Document doc) {
        return new OpinionChat(
                doc.getLong("member_id"),
                doc.getLong("opinion_id"),
                doc.getString("chat"),
                doc.getList("images", String.class),
                doc.getBoolean("is_admin"),
                doc.getDate("created_at")
                        .toInstant()
                        .atZone(java.time.ZoneId.systemDefault())
                        .toLocalDateTime()
        );
    }
}
