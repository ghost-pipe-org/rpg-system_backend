package com.ghostPipe.backend.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ghostPipe.backend.dto.PlayerResponseDTO;
import com.ghostPipe.backend.repositories.PlayerRepository;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerResponseDTO> getAll() {
        return playerRepository.findAll().stream()
            .map(player -> new PlayerResponseDTO(
                player.getId(),
                player.getName(),
                player.getEnrollment(),
                player.getPhoneNumber(),
                player.getEmail(),
                player.getCreatedAt(),
                player.getUpdatedAt()
            ))
            .collect(Collectors.toList());
    }
    
}