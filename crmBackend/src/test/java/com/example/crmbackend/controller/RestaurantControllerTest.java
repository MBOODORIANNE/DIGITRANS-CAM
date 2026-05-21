package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.RestaurantRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.RestaurantResponse;
import com.example.crmbackend.service.interfaces.RestaurantService;
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
class RestaurantControllerTest {

    @Mock
    private RestaurantService restaurantService;

    @InjectMocks
    private RestaurantController restaurantController;

    private RestaurantResponse sampleResponse;
    private RestaurantRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleResponse = new RestaurantResponse();
        sampleRequest = new RestaurantRequest();
    }

    @Test
    void list_ShouldReturnPagedRestaurants() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<RestaurantResponse> expectedPage = new PageImpl<>(Collections.singletonList(sampleResponse));
        when(restaurantService.list(pageable)).thenReturn(expectedPage);

        ApiResponse<Page<RestaurantResponse>> response = restaurantController.list(pageable);

        assertNotNull(response);
        assertEquals(expectedPage, response.getData());
        verify(restaurantService, times(1)).list(pageable);
    }

    @Test
    void getById_ShouldReturnRestaurant() {
        Long id = 1L;
        when(restaurantService.getById(id)).thenReturn(sampleResponse);

        ApiResponse<RestaurantResponse> response = restaurantController.getById(id);

        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        verify(restaurantService, times(1)).getById(id);
    }

    @Test
    void create_ShouldReturnCreatedRestaurant() {
        when(restaurantService.create(sampleRequest)).thenReturn(sampleResponse);

        ApiResponse<RestaurantResponse> response = restaurantController.create(sampleRequest);

        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        assertEquals("Restaurant créé", response.getMessage());
        verify(restaurantService, times(1)).create(sampleRequest);
    }

    @Test
    void update_ShouldReturnUpdatedRestaurant() {
        Long id = 1L;
        when(restaurantService.update(id, sampleRequest)).thenReturn(sampleResponse);

        ApiResponse<RestaurantResponse> response = restaurantController.update(id, sampleRequest);

        assertNotNull(response);
        assertEquals(sampleResponse, response.getData());
        assertEquals("Restaurant mis à jour", response.getMessage());
        verify(restaurantService, times(1)).update(id, sampleRequest);
    }

    @Test
    void delete_ShouldReturnNoContent() {
        Long id = 1L;
        doNothing().when(restaurantService).delete(id);

        ResponseEntity<Void> response = restaurantController.delete(id);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(restaurantService, times(1)).delete(id);
    }
}