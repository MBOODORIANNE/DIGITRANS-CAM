package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.ClientRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.ClientResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.service.interfaces.ClientService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClientControllerTest {

    @Mock
    private ClientService clientService;

    @InjectMocks
    private ClientController clientController;

    private ClientResponse sampleResponse;
    private ClientRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleResponse = new ClientResponse();
        sampleRequest = new ClientRequest();
    }

    @Test
    void search_ShouldReturnPagedClientsWithFilters() {
        // Arrange
        String q = "AGROCAM";
        Client.Segment segment = Client.Segment.VIP; // Ajustez selon les valeurs de votre enum Segment
        String ville = "Douala";
        Pageable pageable = PageRequest.of(0, 10);
        Page<ClientResponse> expectedPage = new PageImpl<>(Collections.singletonList(sampleResponse));

        when(clientService.search(q, segment, ville, pageable)).thenReturn(expectedPage);

        // Act
        ApiResponse<Page<ClientResponse>> response = clientController.search(q, segment, ville, pageable);

        // Assert
        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals(expectedPage, response.getData());
        verify(clientService, times(1)).search(q, segment, ville, pageable);
    }

    @Test
    void getById_ShouldReturnClient() {
        // Arrange
        Long clientId = 1L;
        when(clientService.getById(clientId)).thenReturn(sampleResponse);

        // Act
        ApiResponse<ClientResponse> response = clientController.getById(clientId);

        // Assert
        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        verify(clientService, times(1)).getById(clientId);
    }

    @Test
    void create_ShouldReturnCreatedClient() {
        // Arrange
        when(clientService.create(sampleRequest)).thenReturn(sampleResponse);

        // Act
        ApiResponse<ClientResponse> response = clientController.create(sampleRequest);

        // Assert
        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        assertEquals("Client créé avec succès", response.getMessage());
        verify(clientService, times(1)).create(sampleRequest);
    }

    @Test
    void update_ShouldReturnUpdatedClient() {
        // Arrange
        Long clientId = 1L;
        when(clientService.update(clientId, sampleRequest)).thenReturn(sampleResponse);

        // Act
        ApiResponse<ClientResponse> response = clientController.update(clientId, sampleRequest);

        // Assert
        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        assertEquals("Client mis à jour", response.getMessage());
        verify(clientService, times(1)).update(clientId, sampleRequest);
    }

    @Test
    void delete_ShouldReturnNoContent() {
        // Arrange
        Long clientId = 1L;
        doNothing().when(clientService).delete(clientId);

        // Act
        ResponseEntity<Void> response = clientController.delete(clientId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(clientService, times(1)).delete(clientId);
    }
}