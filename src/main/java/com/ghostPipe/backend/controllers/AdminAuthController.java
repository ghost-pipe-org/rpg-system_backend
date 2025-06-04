package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.model.entities.Admin;
import com.ghostPipe.backend.repositories.AdminRepository;
import com.ghostPipe.backend.config.JwtTokenUtil;
import com.ghostPipe.backend.dto.LoginRequestDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth/admin")
public class AdminAuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginDTO) {

        Admin admin = adminRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Admin não encontrado"));

        if (!admin.getRole().equals(Admin.UserRole.ADMIN)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso restrito a administradores.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        String token = jwtTokenUtil.generateToken(admin);

        return ResponseEntity.ok(Map.of("token", token));
    }
}
