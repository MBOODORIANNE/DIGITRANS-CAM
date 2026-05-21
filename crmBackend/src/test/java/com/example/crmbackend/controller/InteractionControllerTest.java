package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.InteractionRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.InteractionResponse;
import com.example.crmbackend.service.interfaces.InteractionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InteractionControllerTest {

    @Mock
    private InteractionService interactionService;

    @InjectMocks
    private InteractionController interactionController;

    private InteractionResponse sampleResponse;
    private InteractionRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleResponse = new InteractionResponse();
        sampleRequest = new InteractionRequest();
    }

    @Test
    void listByClient_ShouldReturnPagedInteractions() {
        Long clientId = 1L;
        Pageable pageable = PageRequest.of(0, 10);
        Page<InteractionResponse> expectedPage = new PageImpl<>(Collections.singletonList(sampleResponse));
        when(interactionService.listByClient(clientId, pageable)).thenReturn(expectedPage);

        ApiResponse<Page<InteractionResponse>> response = interactionController.listByClient(clientId, pageable);

        assertNotNull(response);
        assertEquals(expectedPage, response.getData());
        verify(interactionService, times(1)).listByClient(clientId, pageable);
    }

    @Test
    void create_ShouldReturnSavedInteraction() {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("commercial@agrocam.com");
        when(interactionService.create(sampleRequest, "commercial@agrocam.com")).thenReturn(sampleResponse);

        ApiResponse<InteractionResponse> response = interactionController.create(sampleRequest, authentication);

        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        assertEquals("Interaction enregistrée", response.getMessage());
        verify(interactionService, times(1)).create(sampleRequest, "commercial@agrocam.com");
    }
}