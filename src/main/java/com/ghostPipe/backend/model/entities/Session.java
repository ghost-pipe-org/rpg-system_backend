package com.ghostPipe.backend.model.entities;

import javax.persistence.Converts;

import com.ghostPipe.backend.model.converters.LocalDateListConverter;
import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table (name = "session")
public class Session {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private int min_players;

    @NotNull
    private int max_players;

    @NotNull
    private String session_title;

    @NotNull
    private String session_description;

    private String session_requirements;

    private SolicitationStatus solicitation_status;

    @NotNull
    private String session_system;

    @NotNull
    private String location;

    @NotNull
    @Column(name = "possible_dates", lenght = 100, nullable = false)
    Converts(converter = LocalDateListConverter.class)
    private List<LocalDate> possible_dates;

    private String approved_date;

    private String cancel_event;

    private SessionPeriod session_period;

    private LocalDateTime created_at;
}
