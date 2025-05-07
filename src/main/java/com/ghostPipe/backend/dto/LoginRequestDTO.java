package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class LoginRequestDTO {
    @NotBlank @Email
    private String email;
    
    @NotBlank @Size(min = 6)
    private String password;
}
