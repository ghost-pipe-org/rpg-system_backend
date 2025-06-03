package com.ghostPipe.backend.dto;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
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
    private List<@FutureOrPresent LocalDate> possible_dates;
}