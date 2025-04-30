package com.ghostPipe.backend.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "player")
@AttributeOverrides({
        @AttributeOverride(name = "email", column = @Column(name = "player_email")),
        @AttributeOverride(name = "password", column = @Column(name = "player_password")),
        @AttributeOverride(name = "name", column = @Column(name = "player_name")),
        @AttributeOverride(name = "phoneNumber", column = @Column(name = "player_phone")),
        @AttributeOverride(name = "createdAt", column = @Column(name = "player_createdat", updatable = false)),
        @AttributeOverride(name = "updatedAt", column = @Column(name = "player_updatedat"))
})
public class Player extends User {

    @Column(name = "player_enrollment", length = 9)
    private String enrollment;
}