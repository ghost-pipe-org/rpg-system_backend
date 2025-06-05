package com.ghostPipe.backend.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ghostPipe.backend.dto.PlayerRequestDTO;
import com.ghostPipe.backend.dto.PlayerResponseDTO;
import com.ghostPipe.backend.model.entities.Player;
import com.ghostPipe.backend.repositories.PlayerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PlayerService(PlayerRepository playerRepository, PasswordEncoder passwordEncoder) {
        this.playerRepository = playerRepository;
        this.passwordEncoder = passwordEncoder;
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
                        player.getUpdatedAt()))
                .collect(Collectors.toList());
    }

    public PlayerResponseDTO createPlayer(PlayerRequestDTO request) {
        Player player = new Player();
        player.setName(request.getName());
        player.setEnrollment(request.getEnrollment());
        player.setPhoneNumber(request.getPhoneNumber());
        player.setEmail(request.getEmail());

        Player savedPlayer = playerRepository.save(player);

        return new PlayerResponseDTO(
                savedPlayer.getId(),
                savedPlayer.getName(),
                savedPlayer.getEnrollment(),
                savedPlayer.getPhoneNumber(),
                savedPlayer.getEmail(),
                savedPlayer.getCreatedAt(),
                savedPlayer.getUpdatedAt());
    }
}