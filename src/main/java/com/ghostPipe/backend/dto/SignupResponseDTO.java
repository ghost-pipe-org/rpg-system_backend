package com.ghostPipe.backend.dto;

public record SignupResponseDTO(
    Long id,
    String email,
    String tipoUsuario,
    String message
) {}