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
        
        public List<MasterResponseDTO> getAll(){
            return masterRepository.findAll().stream()
                .map(master -> new MasterResponseDTO(
                    master.getId(),
                    master.getName(),
                    master.getEmail(),
                    master.getEnrollment(),
                    master.getPhoneNumber(),
                    master.getSessionsOpened(),
                    master.getCreatedAt(),
                    master.getUpdatedAt()
                )).collect(Collectors.toList());
        }
}
