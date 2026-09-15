package com.lta.gestdocum.backend.service;

import com.lta.gestdocum.backend.dto.UserCreateRequest;
import com.lta.gestdocum.backend.dto.UserResponse;
import com.lta.gestdocum.backend.dto.UserUpdateRequest;
import com.lta.gestdocum.backend.model.ClinicalStaff;
import com.lta.gestdocum.backend.model.User;
import com.lta.gestdocum.backend.repository.ClinicalStaffRepository;
import com.lta.gestdocum.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ClinicalStaffRepository clinicalStaffRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, 
                       ClinicalStaffRepository clinicalStaffRepository, 
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clinicalStaffRepository = clinicalStaffRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @SuppressWarnings("null")
    public UserResponse createUser(UserCreateRequest request) {
        User user = User.builder()
                .tenantId(request.getTenantId())
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .status(User.UserStatus.ACTIVE)
                .build();

        User savedUser = userRepository.save(user);

        String staffTypeStr = null;
        String specialtyStr = null;

        if (request.getStaffType() != null) {
            ClinicalStaff staff = ClinicalStaff.builder()
                    .tenantId(request.getTenantId())
                    .user(savedUser)
                    .staffType(request.getStaffType())
                    .specialty(request.getSpecialty())
                    .professionalLicense(request.getProfessionalLicense())
                    .build();
            clinicalStaffRepository.save(staff);
            staffTypeStr = staff.getStaffType().name();
            specialtyStr = staff.getSpecialty();
        }

        return mapToResponse(savedUser, staffTypeStr, specialtyStr);
    }
    @Transactional
    @SuppressWarnings("null")
public UserResponse updateUser(UUID id, UserUpdateRequest request) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setEmail(request.getEmail());

    User updatedUser = userRepository.save(user);

    String staffTypeStr = null;
    String specialtyStr = null;

    Optional<ClinicalStaff> staffOpt = clinicalStaffRepository.findByUserId(id);
    if (staffOpt.isPresent()) {
        ClinicalStaff staff = staffOpt.get();
        if (request.getStaffType() != null) {
            staff.setStaffType(request.getStaffType());
            staff.setSpecialty(request.getSpecialty());
            staff.setProfessionalLicense(request.getProfessionalLicense());
            clinicalStaffRepository.save(staff);
        }
        staffTypeStr = staff.getStaffType().name();
        specialtyStr = staff.getSpecialty();
    }

    return mapToResponse(updatedUser, staffTypeStr, specialtyStr);
}
/* 
    @Transactional
    public UserResponse updateUser(UUID id, UserCreateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        String staffTypeStr = null;
        String specialtyStr = null;

        Optional<ClinicalStaff> staffOpt = clinicalStaffRepository.findByUserId(id);
        if (staffOpt.isPresent()) {
            ClinicalStaff staff = staffOpt.get();
            if (request.getStaffType() != null) {
                staff.setStaffType(request.getStaffType());
                staff.setSpecialty(request.getSpecialty());
                staff.setProfessionalLicense(request.getProfessionalLicense());
                clinicalStaffRepository.save(staff);
            }
            staffTypeStr = staff.getStaffType().name();
            specialtyStr = staff.getSpecialty();
        }

        return mapToResponse(updatedUser, staffTypeStr, specialtyStr);
    }*/

    @Transactional
    @SuppressWarnings("null")
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setDeletedAt(OffsetDateTime.now());
        user.setStatus(User.UserStatus.INACTIVE);
        userRepository.save(user);
    }

    private UserResponse mapToResponse(User user, String staffType, String specialty) {
        return UserResponse.builder()
                .id(user.getId())
                .tenantId(user.getTenantId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .status(user.getStatus().name())
                .staffType(staffType)
                .specialty(specialty)
                .build();
    }
}
