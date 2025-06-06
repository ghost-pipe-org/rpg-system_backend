package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.dto.PlayerRequestDTO;
import com.ghostPipe.backend.dto.PlayerResponseDTO;
import com.ghostPipe.backend.services.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<PlayerResponseDTO>> getAll() {
        List<PlayerResponseDTO> players = playerService.getAll();
        return ResponseEntity.ok(players);
    }

    @PostMapping
    public ResponseEntity<PlayerResponseDTO> createPlayer(@RequestBody PlayerRequestDTO request) {
        PlayerResponseDTO createdPlayer = playerService.createPlayer(request);
        System.out.println("Player created: " + createdPlayer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
    }

}