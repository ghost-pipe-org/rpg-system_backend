package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@Builder
public class PlayerRequestDTO {

    @NotBlank(message = "Este campo é obrigatório")
    @Size(max = 100, message = "Você excedeu o número máximo de caracteres permitidos")
    private String name;

    @Size(max = 9, message = "Matrícula inválida")
    private String enrollment;

    @Size(max = 20, message = "Número de telefone inválido")
    private String phoneNumber;

    @NotBlank(message = "Este campo é obrigatório")
    @Size(min = 6, max = 255, message = "A senha deve ter pelo menos seis caracteres")
    private String password;

    @NotBlank(message = "Este campo é obrigatório")
    @Email(message = "O email deve ser válido")
    @Size(max = 255, message = "Número de caracteres excedido")
    private String email;
}
