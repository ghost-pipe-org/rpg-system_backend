package com.ghostPipe.backend.dto;
 feat/iago/issue#25-27

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
main

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerRequestDTO {
    @NotBlank(message = "Este campo é obrigatório")
    @Size(max = 100, message = "Você excedeu o número máximo de caracteres permitidos")
    private String name;

    @Size(max = 9, message = "Matrícula inválida")
    private String enrollment;

    @Size(max = 20, message = "Número de telefone inválido")
    private String phone;

    @NotBlank(message = "Este campo é obrigatório")
    @Size(min = 6, max = 255, message = "A senha deve ter pelo menos seis caracteres")
    private String encryptedpassword;

    @NotBlank(message = "Este campo é obrigatório")
    @Email(message = "O email deve ser válido")
    @Size(max = 255, message = "Número de caracteres excedido")
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(String enrollment) {
        this.enrollment = enrollment;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEncryptedpassword() {
        return encryptedpassword;
    }

    public void setEncryptedpassword(String encryptedpassword) {
        this.encryptedpassword = encryptedpassword;
    }

    public String getEmail() {
        return email;
    }
}
