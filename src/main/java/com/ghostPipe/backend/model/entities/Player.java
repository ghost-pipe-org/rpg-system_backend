package com.ghostPipe.backend.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long id;

    @NotBlank
    @Column(name = "player_name", length = 100)
    private String name;

    @Column(name = "player_enrollment", length = 9)
    private String enrollment;

    @Column(name = "player_phone", length = 20)
    private String phone;

    // TODO olhar uma forma de por regex diretamente na senha   
    @NotBlank(message = "The password is obligatory")
    @Column(name = "player_password", nullable = false, length = 255)
    private String encryptedpassword;

    @Email(message = "The email must be valid")
    @NotBlank(message = "email")
    @Column(name = "player_email", nullable = false, length = 255, unique = true)
    private String email;

    @CreationTimestamp
    @Column(name = "player_createdat", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "player_updatedat")
    private LocalDateTime updatedAt;
}