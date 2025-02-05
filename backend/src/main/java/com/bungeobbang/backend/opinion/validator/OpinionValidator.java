package com.bungeobbang.backend.opinion.validator;

import com.bungeobbang.backend.auth.domain.Accessor;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.common.exception.OpinionException;
import com.bungeobbang.backend.opinion.domain.Opinion;
import org.springframework.stereotype.Component;

@Component
public class OpinionValidator {

    public void validateAuthor(Opinion opinion, Accessor accessor) {
        if (!opinion.getMember().getId().equals(accessor.id())) {
            throw new OpinionException(ErrorCode.UNAUTHORIZED_OPINION_ACCESS);
        }
    }
}
