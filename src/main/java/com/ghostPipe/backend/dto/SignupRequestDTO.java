package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequestDTO(

        @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must not exceed 100 characters") String name,
        @Size(max = 20, message = "Phone number must not exceed 20 characters") String phoneNumber,
        @NotBlank(message = "Email is required") @jakarta.validation.constraints.Email(message = "Email must be valid") String email,

        @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String password,

        boolean masterConfirm,

        @Size(min = 9, max = 9, message = "Enrollment must be exactly 9 digits") @Pattern(regexp = "^[0-9]+$", message = "Enrollment must contain only numbers") String enrollment) {
}