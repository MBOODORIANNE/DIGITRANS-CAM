package com.example.crmbackend.service.interfaces;

import com.example.crmbackend.dto.request.LoginRequest;
import com.example.crmbackend.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest req);
}
