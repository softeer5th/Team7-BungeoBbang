package com.bungeobbang.backend.agenda.service;

import com.bungeobbang.backend.admin.domain.Admin;
import com.bungeobbang.backend.admin.domain.repository.AdminRepository;
import com.bungeobbang.backend.agenda.domain.Agenda;
import com.bungeobbang.backend.agenda.domain.AgendaImage;
import com.bungeobbang.backend.agenda.domain.repository.AgendaImageRepository;
import com.bungeobbang.backend.agenda.domain.repository.AgendaRepository;
import com.bungeobbang.backend.agenda.dto.request.AgendaCreationRequest;
import com.bungeobbang.backend.agenda.dto.request.AgendaEditRequest;
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

    @Transactional
    public void endAgenda(final Long agendaId) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        agenda.end();
    }

    @Transactional
    public void deleteAgenda(final Long agendaId) {
        agendaRepository.deleteById(agendaId);

        // todo async로 채팅내역 삭제...
    }

    @Transactional
    public void editAgenda(final Long agendaId, final AgendaEditRequest request) {
        final Agenda agenda = agendaRepository.findById(agendaId)
                .orElseThrow(() -> new AgendaException(INVALID_AGENDA));

        final Agenda updateAgenda = Agenda.builder()
                .categoryType(request.categoryType())
                .university(agenda.getUniversity())
                .admin(agenda.getAdmin())
                .title(request.title())
                .startDate(agenda.getStartDate())
                .endDate(agenda.getEndDate())
                .content(request.content())
                .isEnd(agenda.isEnd())
                .count(agenda.getCount())
                .images(updateImages(agenda.getImages(), request.images(), agenda)
                ).build();
        // todo 필요한 반환값?
    }

    private List<AgendaImage> updateImages(final List<AgendaImage> oldImages, final List<String> newImageNames, Agenda agenda) {
        List<AgendaImage> newImages = newImageNames.stream()
                .map(imageName -> makeUpdatedImages(oldImages, imageName, agenda))
                .toList();

        deleteNotUsedImages(oldImages, newImages);
        saveNewlyImages(oldImages, newImages);
        return newImages;
    }


    private AgendaImage makeUpdatedImages(final List<AgendaImage> oldImages, final String imageName, final Agenda agenda) {
        return oldImages.stream()
                .filter(oldImage -> oldImage.getName().equals(imageName))
                .findAny()
                .orElseGet(() -> AgendaImage.builder()
                        .agenda(agenda)
                        .name(imageName)
                        .build());
    }

    private void saveNewlyImages(final List<AgendaImage> oldImages, final List<AgendaImage> newImages) {
        final List<AgendaImage> newlyImages = newImages.stream()
                .filter(image -> !oldImages.contains(image))
                .toList();

        agendaImageRepository.saveAll(newlyImages);
    }

    private void deleteNotUsedImages(final List<AgendaImage> oldImages, final List<AgendaImage> newImages) {
        final List<AgendaImage> deletedImages = oldImages.stream()
                .filter(image -> !newImages.contains(image))
                .toList();
        if (deletedImages.isEmpty())
            return;

        agendaImageRepository.deleteAll(deletedImages);
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
}
