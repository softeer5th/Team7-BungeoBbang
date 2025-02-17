package com.bungeobbang.backend.opinion.domain.repository;

import com.bungeobbang.backend.common.type.ScrollType;
import com.bungeobbang.backend.opinion.domain.OpinionChat;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
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

        Sort sort = scroll.equals(ScrollType.DOWN) ?
                Sort.by(Sort.Direction.ASC, ID) : Sort.by(Sort.Direction.DESC, ID);

        Pageable pageable = PageRequest.of(0, 10, sort);
        List<OpinionChat> opinionChats = new ArrayList<>(opinionChatRepository.findOpinionChats(opinionId, comparison, chatId, pageable));
        if (scroll.equals(ScrollType.UP) || (scroll.equals(ScrollType.INITIAL) && chatId.equals(MAX_OBJECT_ID)))
            Collections.reverse(opinionChats);
        return opinionChats;
    }
}
