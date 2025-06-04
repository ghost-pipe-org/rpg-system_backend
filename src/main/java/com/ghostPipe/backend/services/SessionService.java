package com.ghostPipe.backend.services;

import com.ghostPipe.backend.dto.SessionRequestDTO;
import com.ghostPipe.backend.dto.SessionResponseDTO;
import com.ghostPipe.backend.model.entities.Session;
import com.ghostPipe.backend.model.entities.User;
import com.ghostPipe.backend.model.entities.SolicitationStatus;
import com.ghostPipe.backend.repositories.SessionRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionResponseDTO createSession(SessionRequestDTO request) {
        User master = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Session session = Session.builder()
                .session_title(request.getSession_title())
                .session_description(request.getSession_description())
                .session_period(request.getSession_period())
                .session_system(request.getSession_system())
                .solicitation_status(SolicitationStatus.PENDING)
                .approved_date(request.getApproved_date())
                .possible_dates(request.getPossible_dates())
                .master(master)
                .build();

        Session savedSession = sessionRepository.save(session);

        return convertToDTO(savedSession);
    }

    private SessionResponseDTO convertToDTO(Session session) {
        return new SessionResponseDTO(
                session.getId(),
                session.getSession_title(),
                session.getSession_description(),
                session.getSession_period(),
                session.getSession_system(),
                session.getSolicitation_status(),
                session.getCreated_at(),
                session.getApproved_date(),
                session.getPossible_dates(),
                session.getMaster().getId());
    }
}