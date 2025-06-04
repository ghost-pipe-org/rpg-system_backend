package com.ghostPipe.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.*;
import lombok.Setter;
import com.ghostPipe.backend.model.entities.SessionPeriod;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionRequestDTO {

    @NotNull(message = "Minimum players is required")
    @Min(value = 1, message = "Minimum players must be at least 1")
    private Integer min_players;

    @NotNull(message = "Maximum players is required")
    @Min(value = 1, message = "Maximum players must be at least 1")
    private Integer max_players;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be at most 100 characters")
    private String session_title;

    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must be at most 500 characters")
    private String session_description;

    @NotNull(message = "Game system is required")
    private String session_system;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Possible dates are required")
    @Size(min = 1, message = "At least one possible date must be provided")
    @FutureOrPresent(message = "Possible dates must be in the future or present")
    private List<LocalDate> possible_dates;

    private SessionPeriod session_period;

    private String approved_date;

    private String solicitation_status;

    private String session_requirements;
}