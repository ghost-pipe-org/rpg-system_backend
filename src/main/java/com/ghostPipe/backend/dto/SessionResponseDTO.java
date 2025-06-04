package com.ghostPipe.backend.dto;

import com.ghostPipe.backend.model.entities.SessionPeriod;
import com.ghostPipe.backend.model.entities.SolicitationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponseDTO {
    private Long id;
    private String session_title;
    private String session_description;
    private SessionPeriod session_period;
    private String session_system;
    private SolicitationStatus solicitation_status;
    private LocalDateTime created_at;
    private String approved_date;
    private List<LocalDate> possible_dates;
    private Long master_id;
}