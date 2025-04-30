package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerRequestDTO {

    @NotBlank(message = "Nome é obrigatório")

    private String name;

    private String enrollment;

    private String phoneNumber;

    @Email(message = "Formato de email inválido")
    @NotBlank(message = "Email é obrigatório")

    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
    private String password;
}
