package com.ghostPipe.backend.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admins")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter
@Setter

public class Admin extends User {

    public Admin() {
        super.setRole(UserRole.ADMIN);
    }
}
