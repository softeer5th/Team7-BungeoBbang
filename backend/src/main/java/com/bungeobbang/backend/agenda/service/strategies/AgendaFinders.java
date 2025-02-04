package com.bungeobbang.backend.agenda.service.strategies;

import com.bungeobbang.backend.agenda.status.AgendaStatusType;
import com.bungeobbang.backend.common.exception.AgendaException;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.NOT_SUPPORT_STATUS;

@Component
public class AgendaFinders {
    List<AgendaFinder> strategies;

    public AgendaFinders(List<AgendaFinder> strategies) {
        this.strategies = strategies;
    }

    public AgendaFinder mapping(final AgendaStatusType statusType) {
        return strategies.stream().filter(
                strategy -> strategy.getStatus().equals(statusType)
        ).findFirst().orElseThrow(() -> new AgendaException(NOT_SUPPORT_STATUS));
    }
}
