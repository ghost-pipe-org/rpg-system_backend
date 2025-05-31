package com.ghostPipe.backend.services;

import java.util.stream.Collectors;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.ghostPipe.backend.dto.MasterResponseDTO;
import com.ghostPipe.backend.repositories.MasterRepository;

public class MasterService {
        private final MasterRepository masterRepository;

        @Autowired
        public MasterService(MasterRepository masterRepository){
            this.masterRepository = masterRepository;
        }
        
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
                    .build()
                ).collect(Collectors.toList());
        }
}