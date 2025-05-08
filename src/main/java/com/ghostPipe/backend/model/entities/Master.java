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
@AttributeOverrides({
        @AttributeOverride(name = "email", column = @Column(name = "master_email")),
        @AttributeOverride(name = "password", column = @Column(name = "master_password")),
        @AttributeOverride(name = "name", column = @Column(name = "master_name")),
        @AttributeOverride(name = "phoneNumber", column = @Column(name = "master_phone")),
        @AttributeOverride(name = "createdAt", column = @Column(name = "master_createdat", updatable = false)),
        @AttributeOverride(name = "updatedAt", column = @Column(name = "master_updatedat"))
})
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
