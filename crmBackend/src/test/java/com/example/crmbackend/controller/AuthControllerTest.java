package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.LoginRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.AuthResponse;
import com.example.crmbackend.service.interfaces.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @Test
    void login_ShouldReturnAuthTokenOnSuccess() {
        LoginRequest loginRequest = new LoginRequest();
        AuthResponse expectedResponse = new AuthResponse();

        when(authService.login(loginRequest)).thenReturn(expectedResponse);

        ApiResponse<AuthResponse> response = authController.login(loginRequest);

        assertNotNull(response);
        assertEquals(expectedResponse, response.getData());
        assertEquals("Connexion réussie", response.getMessage());
        verify(authService, times(1)).login(loginRequest);
    }
}