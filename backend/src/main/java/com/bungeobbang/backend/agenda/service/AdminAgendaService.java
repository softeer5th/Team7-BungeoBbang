package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.repository.AgendaImageRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.response.AgendaCreationResponse;
import com.bungeobbang.backend.common.exception.AdminException;
import com.bungeobbang.backend.common.exception.AgendaException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_AGENDA;

@Service
@RequiredArgsConstructor
public class AdminAgendaService {
    private final AgendaRepository agendaRepository;
    private final AgendaImageRepository agendaImageRepository;
    private final AdminRepository adminRepository;

    public AgendaCreationResponse createAgenda(final Long adminId, final AgendaCreationRequest request) {
        final Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(ErrorCode.INVALID_ADMIN));

        final Agenda save = agendaRepository.save(Agenda.builder()
                .admin(admin)
                .university(admin.getUniversity())
                .categoryType(request.category())
                .title(request.title())
                .content(request.content())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .isEnd(false)
                .build());

        final List<AgendaImage> images = makeImages(request.images(), save);
        agendaImageRepository.saveAll(images);

        return AgendaCreationResponse.from(save);
    }

    private List<AgendaImage> makeImages(final List<String> images, final Agenda agenda) {
        return images.stream()
                .map(image ->
                        AgendaImage.builder()
                                .agenda(agenda)
                                .name(image)
                                .build())
                .toList();
    }

    @Transactional
    public void endAgenda(Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        agenda.end();
    }
}
