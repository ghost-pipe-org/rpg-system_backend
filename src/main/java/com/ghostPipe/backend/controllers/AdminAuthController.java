package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.model.entities.User;
import com.ghostPipe.backend.model.entities.UserRole;
import com.ghostPipe.backend.repositories.AdminRepository;
import com.ghostPipe.backend.config.JwtTokenUtil;
import com.ghostPipe.backend.dto.LoginRequestDTO;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/admin")
public class AdminAuthController {

    private AuthenticationManager authenticationManager;
    private AdminRepository adminRepository;
    private JwtTokenUtil jwtTokenUtil;

    public AdminAuthController(
            AuthenticationManager authenticationManager,
            AdminRepository adminRepository,
            JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.adminRepository = adminRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginDTO) {

        User user = adminRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Admin não encontrado"));

        if (!user.getRole().equals(UserRole.ADMIN)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso restrito a administradores.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        String token = jwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(Map.of("token", token));
    }
}
