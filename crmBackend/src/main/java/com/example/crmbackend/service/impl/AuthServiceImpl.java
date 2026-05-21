package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.request.LoginRequest;
import com.example.crmbackend.dto.response.AuthResponse;
import com.example.crmbackend.entity.User;
import com.example.crmbackend.exception.UnauthorizedException;
import com.example.crmbackend.repository.UserRepository;
import com.example.crmbackend.security.JwtService;
import com.example.crmbackend.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest req) {
        User u = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Identifiants invalides"));
        if (!encoder.matches(req.getPassword(), u.getPasswordHash())) {
            throw new UnauthorizedException("Identifiants invalides");
        }
        if (!Boolean.TRUE.equals(u.getActif())) {
            throw new UnauthorizedException("Compte désactivé");
        }
        String token = jwtService.generateToken(u.getEmail(), u.getRole().name(), u.getId());
        return AuthResponse.builder()
                .token(token).type("Bearer")
                .email(u.getEmail()).nom(u.getNom()).prenom(u.getPrenom())
                .role(u.getRole().name())
                .build();
    }
}
