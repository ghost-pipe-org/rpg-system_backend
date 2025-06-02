package com.ghostPipe.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ErrorResponseDTO {
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
}