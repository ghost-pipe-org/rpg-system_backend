package com.ghostPipe.backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MasterResponseDTO {

    private Long id;
    private String name;
    private String enrollment;
    private String phoneNumber;
    private String email;
    private Integer sessionsOpened;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
