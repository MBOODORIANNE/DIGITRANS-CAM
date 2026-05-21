package com.example.crmbackend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type;
    private String email;
    private String nom;
    private String prenom;
    private String role;
}
