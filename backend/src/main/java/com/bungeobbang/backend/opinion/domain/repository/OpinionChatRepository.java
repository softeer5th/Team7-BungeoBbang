package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.opinion.domain.OpinionChat;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Repository;

@Repository
public class OpinionChatRepository {
    private final MongoDatabase database;
    private final MongoCollection<Document> collection;

    public OpinionChatRepository(MongoClient mongoClient) {
        this.database = mongoClient.getDatabase("mydatabase");
        this.collection = database.getCollection("opinion_chat");
    }

    public void save(OpinionChat opinionChat) {
        Document doc = new Document()
                .append("member_id", opinionChat.getMemberId())
                .append("opinion_id", opinionChat.getOpinionId())
                .append("chat", opinionChat.getChat())
                .append("images", opinionChat.getImages())
                .append("is_admin", opinionChat.isAdmin())
                .append("created_at", opinionChat.getCreatedAt());
        collection.insertOne(doc);
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
