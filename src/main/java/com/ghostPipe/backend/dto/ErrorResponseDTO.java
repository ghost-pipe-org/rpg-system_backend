package com.ghostPipe.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ErrorResponseDTO {
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
}