package com.ghostPipe.backend.dto;

import com.ghostPipe.backend.model.entities.User.UserRole;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private Long userId;
    private UserRole userRole;
}
