package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomOpinionChatRepository {

    public static final String ID = "_id";
    private static final ObjectId MAX_OBJECT_ID = new ObjectId("ffffffffffffffffffffffff");
    private final OpinionChatRepository opinionChatRepository;

    public List<OpinionChat> findOpinionChats(Long opinionId, ObjectId chatId, ScrollType scroll) {
        String comparison = switch (scroll) {
            case UP -> "$lt";   // `_id < chatId`
            case DOWN -> "$gt";  // `_id > chatId`
            case INITIAL -> chatId.equals(MAX_OBJECT_ID) ? "$lt" : "$gte"; // `MAX_OBJECT_ID`일 경우 최신 10개 조회
        };

        Sort sort = Sort.by(Sort.Direction.ASC, ID);

        Pageable pageable = PageRequest.of(0, 10, sort);
        return opinionChatRepository.findOpinionChats(opinionId, comparison, chatId, pageable);
    }
}
