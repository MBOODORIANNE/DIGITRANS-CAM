package com.example.crmbackend.controller;

import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.DashboardResponse;
import com.example.crmbackend.service.interfaces.DashboardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {
    private final DashboardService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ApiResponse<DashboardResponse> getStats() {
        return ApiResponse.ok(service.getStats());
    }
}
