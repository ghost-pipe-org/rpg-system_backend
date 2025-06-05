package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.dto.*;
import com.ghostPipe.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            LoginResponseDTO response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorResponseDTO(e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ErrorResponseDTO("Erro interno no servidor"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDTO request) {
        try {
            LoginResponseDTO response = authService.signup(request);
            System.out.println("Usuário cadastrado: " + response + request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(new ErrorResponseDTO(e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ErrorResponseDTO("Falha ao processar cadastro"));
        }
    }
}