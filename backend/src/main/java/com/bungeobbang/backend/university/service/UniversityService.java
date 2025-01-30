package com.bungeobbang.backend.university.service;

import com.bungeobbang.backend.university.domain.repository.UniversityRepository;
import com.bungeobbang.backend.university.dto.response.UniversityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UniversityService {
    private final UniversityRepository universityRepository;

    public List<UniversityResponse> getAllUniversities() {
        return universityRepository.findAll()
                .stream()
                .map(UniversityResponse::from)
                .toList();
    }
}
