package com.ghostPipe.backend.services;

import com.ghostPipe.backend.model.entities.UserRole;
import com.ghostPipe.backend.config.JwtTokenUtil;
import com.ghostPipe.backend.dto.LoginRequestDTO;
import com.ghostPipe.backend.dto.LoginResponseDTO;
import com.ghostPipe.backend.model.entities.User;
import com.ghostPipe.backend.repositories.UserRepository;
import com.ghostPipe.backend.repositories.MasterRepository;
import com.ghostPipe.backend.repositories.PlayerRepository;
import com.ghostPipe.backend.dto.SignupRequestDTO;
import com.ghostPipe.backend.model.entities.Master;
import com.ghostPipe.backend.model.entities.Player;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final MasterRepository masterRepository;
    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Credenciais inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(UNAUTHORIZED, "Credenciais inválidas");
        }

        return new LoginResponseDTO(
                jwtTokenUtil.generateToken(user),
                user.getId(),
                user.getRole());
    }

    public LoginResponseDTO signup(SignupRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }

        User newUser;

        if (request.isMasterConfirm()) {
            if (request.getEnrollment() == null || !request.getEnrollment().matches("\\d{9}")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Matrícula inválida. Formato: 9 dígitos");
            }

            Master master = new Master();
            master.setName(request.getName());
            master.setPhoneNumber(request.getPhoneNumber());
            master.setEmail(request.getEmail());
            master.setPassword(passwordEncoder.encode(request.getPassword()));
            master.setEnrollment(request.getEnrollment());
            master.setRole(UserRole.MASTER);
            newUser = masterRepository.save(master);

            System.out.println("Criando mestre...");

        } else {
            Player player = new Player();
            player.setName(request.getName());
            player.setPhoneNumber(request.getPhoneNumber());
            player.setEmail(request.getEmail());
            player.setPassword(passwordEncoder.encode(request.getPassword()));
            player.setEnrollment(request.getEnrollment());
            player.setRole(UserRole.PLAYER);
            newUser = playerRepository.save(player);

            System.out.println("Criando jogador...");
        }

        return LoginResponseDTO.builder()
                .token(jwtTokenUtil.generateToken(newUser))
                .userId(newUser.getId())
                .userRole(newUser.getRole())
                .build();
    }
}