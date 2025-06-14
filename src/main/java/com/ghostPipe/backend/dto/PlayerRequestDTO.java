package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerRequestDTO {
    @NotBlank(message = "This field is required")
    @Size(max = 100, message = "You have exceeded the maximum allowed number of characters")
    private String name;

    @Size(max = 9, message = "Invalid enrollment number")
    private String enrollment;

    @Size(max = 20, message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "This field is required")
    @Size(min = 6, max = 255, message = "Password must be at least six characters long")
    private String password;

    @NotBlank(message = "This field is required")
    @Email(message = "Email must be valid")
    @Size(max = 255, message = "Maximum number of characters exceeded")
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
}
