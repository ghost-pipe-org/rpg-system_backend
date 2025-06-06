package com.ghostPipe.backend.controllers;

import com.ghostPipe.backend.dto.AdminCreateDTO;
import com.ghostPipe.backend.model.entities.Admin;
import com.ghostPipe.backend.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public ResponseEntity<?> criarAdmin(@RequestBody AdminCreateDTO dto) {
        if (adminService.existByEmail(dto.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado.");
        }

        Admin admin = adminService.createAdmin(dto.name(), dto.email(), dto.password());
        return ResponseEntity.status(HttpStatus.CREATED).body(admin);
    }
}
