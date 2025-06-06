package com.ghostPipe.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SignupResponseDTO {
        private Long id;
        private String name;
        private String email;
        private String phoneNumber;
        private String userRole;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String enrollment;

        private String accessToken;
        private String refreshToken;
        private String message;

        public static SignupResponseDTO success(Long id, String name, String email, String userRole,
                        String accessToken, String refreshToken) {
                return SignupResponseDTO.builder()
                                .id(id)
                                .name(name)
                                .email(email)
                                .userRole(userRole)
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .message("Registrado com sucesso")
                                .build();
        }

        public static SignupResponseDTO error(String message) {
                return SignupResponseDTO.builder()
                                .message(message)
                                .build();
        }
}