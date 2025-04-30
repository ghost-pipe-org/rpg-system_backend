package com.ghostPipe.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerResponseDTO {

    private Long id;
    private String name;
    private String enrollment;
    private String phoneNumber;
    private String email;
}
