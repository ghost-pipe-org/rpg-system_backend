package com.ghostPipe.backend.model.entities;

import jakarta.persistence.*;
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
    public String getEnrollment() {
        return super.getEnrollment();
    }
}
