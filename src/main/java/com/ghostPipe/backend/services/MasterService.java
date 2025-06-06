package com.ghostPipe.backend.services;

import com.ghostPipe.backend.dto.MasterResponseDTO;
import com.ghostPipe.backend.repositories.MasterRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class MasterService {
    
    private final MasterRepository masterRepository;

    public List<MasterResponseDTO> getAll() {
        return masterRepository.findAll().stream()
                .map(master -> MasterResponseDTO.builder()
                        .id(master.getId())
                        .name(master.getName())
                        .email(master.getEmail())
                        .enrollment(master.getEnrollment())
                        .phoneNumber(master.getPhoneNumber())
                        .sessionsOpened(master.getSessionsOpened())
                        .createdAt(master.getCreatedAt())
                        .updatedAt(master.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}