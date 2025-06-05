package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SignupRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @jakarta.validation.constraints.Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "phone is required")
    private String phone;
    
    private boolean queroSerMestre;

    @NotBlank(message = "Enrollment is required for masters")
    @Size(min = 9, max = 9, message = "Enrollment must be exactly 9 digits")
    @Pattern(regexp = "^[0-9]+$", message = "Enrollment must contain only numbers")
    private String enrollment;
}