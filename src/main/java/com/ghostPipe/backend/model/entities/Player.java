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

public class Player extends User {

    @Column(name = "player_enrollment", length = 9)
    private String enrollment;
}