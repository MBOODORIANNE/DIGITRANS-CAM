package com.example.crmbackend.controller;

import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.DashboardResponse;
import com.example.crmbackend.service.interfaces.DashboardService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardControllerTest {

    @Mock
    private DashboardService dashboardService;

    @InjectMocks
    private DashboardController dashboardController;

    @Test
    void getStats_ShouldReturnDashboardData() {
        DashboardResponse expectedResponse = new DashboardResponse();
        when(dashboardService.getStats()).thenReturn(expectedResponse);

        ApiResponse<DashboardResponse> response = dashboardController.getStats();

        assertNotNull(response);
        assertEquals(expectedResponse, response.getData());
        verify(dashboardService, times(1)).getStats();
    }
}