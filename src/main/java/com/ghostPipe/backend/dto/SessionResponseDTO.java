package com.ghostPipe.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SessionResponseDTO {
    private Long id;
    private String name;
    private String enrollment;
    private String phoneNumber;
    private String email;
    private Integer sessionsOpened;
    private String createdAt;
    private String updatedAt; 
}
