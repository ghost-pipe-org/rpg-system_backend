package com.ghostPipe.backend.model.entities;

import com.ghostPipe.backend.model.converters.LocalDateListConverter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.Convert;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import java.util.List;
import jakarta.persistence.EnumType;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table (name = "sessions")
public class Session {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private int min_players;

    @NotNull
    private int max_players;

    @NotNull
    @Size(max=100, message = "The session title must be at most 100 characters long")
    private String session_title;

    @NotNull
    @Size(max=500, message = "The session description must be at most 500 characters long")
    private String session_description;

    private String session_requirements;

    @Enumerated(EnumType.STRING)
    private SolicitationStatus solicitation_status;

    @NotNull
    private String session_system;

    @NotNull
    private String location;

    @NotNull
    @Column(name = "possible_dates", length = 100, nullable = false)
    @Convert(converter = LocalDateListConverter.class)
    @FutureOrPresent(message = "The session date must be in the future or today")
    private List<LocalDate> possible_dates;

    @FutureOrPresent(message = "The session date must be in the future or today")
    private String approved_date;

    private String cancel_event;

    @Enumerated(EnumType.STRING)
    private SessionPeriod session_period;

    private LocalDateTime created_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "master_id")
    @NotNull
    private User master;
}
