package com.ghostPipe.backend.services;

import com.ghostPipe.backend.model.entities.Admin;
import com.ghostPipe.backend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin criarAdmin(String name, String email, String password) {
        Admin admin = new Admin();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(Admin.UserRole.ADMIN);

        return adminRepository.save(admin);
    }

    public boolean existePorEmail(String email) {
        return adminRepository.findByEmail(email).isPresent();
    }
}
