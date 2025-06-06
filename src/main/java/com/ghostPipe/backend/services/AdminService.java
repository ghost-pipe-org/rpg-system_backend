package com.ghostPipe.backend.services;

import com.ghostPipe.backend.model.entities.Admin;
import com.ghostPipe.backend.model.entities.UserRole;
import com.ghostPipe.backend.repositories.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private AdminRepository adminRepository;
    private PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin createAdmin(String name, String email, String password) {
        Admin admin = new Admin();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(UserRole.ADMIN);

        return adminRepository.save(admin);
    }

    public boolean existByEmail(String email) {
        return adminRepository.findByEmail(email).isPresent();
    }
}
