package com.ghostPipe.backend.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "master")

public class Master extends Player {

    @Column(name = "sessions_opened", nullable = false)
    private Integer sessionsOpened = 0;

    @Override
    @NotBlank(message = "A matrícula é obrigatória para mestre e este campo não deve ser vazio")
    @Pattern(regexp = "\\d{9}", message = "A matrícula deve ter exatamente 9 dígitos")
    public String getEnrollment() {
        return super.getEnrollment();
    }
}
