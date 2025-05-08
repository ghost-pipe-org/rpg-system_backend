package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.dto.PlayerRequestDTO;
import com.ghostPipe.backend.dto.PlayerResponseDTO;
import com.ghostPipe.backend.services.PlayerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/players")
public class PlayerController {
    private final PlayerService playerService; 

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService; 
    }

    @GetMapping
    public ResponseEntity<List<PlayerResponseDTO>> getAll() {
        List<PlayerResponseDTO> players = playerService.getAll(); 
        return ResponseEntity.ok(players);
    }
@PostMapping
public ResponseEntity<PlayerResponseDTO> createPlayer(@RequestBody PlayerRequestDTO request){
    PlayerResponseDTO createdPlayer = playerService.createPlayer(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
}

}