package com.lta.gestdocum.backend.service;

import com.lta.gestdocum.backend.dto.AuthRequest;
import com.lta.gestdocum.backend.dto.AuthResponse;
import com.lta.gestdocum.backend.model.ClinicalStaff;
import com.lta.gestdocum.backend.model.User;
import com.lta.gestdocum.backend.repository.ClinicalStaffRepository;
import com.lta.gestdocum.backend.repository.UserRepository;
import com.lta.gestdocum.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ClinicalStaffRepository clinicalStaffRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, 
                       ClinicalStaffRepository clinicalStaffRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.clinicalStaffRepository = clinicalStaffRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        if (user.getDeletedAt() != null || user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("Usuario inactivo o dado de baja");
        }

        // Obtener rol clínico si existe
        String role = "ADMIN";
        Optional<ClinicalStaff> staffOpt = clinicalStaffRepository.findByUserId(user.getId());
        if (staffOpt.isPresent()) {
            role = staffOpt.get().getStaffType().name();
        }

        String token = jwtService.generateToken(user.getId(), user.getTenantId(), user.getUsername(), role);
        return new AuthResponse(token, "Bearer");
    }
}
