package com.ghostPipe.backend.services;

import com.ghostPipe.backend.dto.PlayerRequestDTO;
import com.ghostPipe.backend.dto.PlayerResponseDTO;
import com.ghostPipe.backend.model.entities.Player;
import com.ghostPipe.backend.repositories.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;

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
        if (playerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já está em uso");
        }

        Player player = new Player();
        player.setName(request.getName());
        player.setEnrollment(request.getEnrollment());
        player.setPhoneNumber(request.getPhoneNumber());
        player.setEmail(request.getEmail());
        player.setPassword(passwordEncoder.encode(request.getPassword()));

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