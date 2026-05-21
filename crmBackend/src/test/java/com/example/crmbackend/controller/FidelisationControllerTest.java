package com.example.crmbackend.controller;

import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.FidelisationResponse;
import com.example.crmbackend.service.interfaces.FidelisationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FidelisationControllerTest {

    @Mock
    private FidelisationService fidelisationService;

    @InjectMocks
    private FidelisationController fidelisationController;

    @Test
    void getByClient_ShouldReturnFidelisationInfo() {
        Long clientId = 1L;
        FidelisationResponse expectedResponse = new FidelisationResponse();
        when(fidelisationService.getByClient(clientId)).thenReturn(expectedResponse);

        ApiResponse<FidelisationResponse> response = fidelisationController.getByClient(clientId);

        assertNotNull(response);
        assertEquals(expectedResponse, response.getData());
        verify(fidelisationService, times(1)).getByClient(clientId);
    }
}