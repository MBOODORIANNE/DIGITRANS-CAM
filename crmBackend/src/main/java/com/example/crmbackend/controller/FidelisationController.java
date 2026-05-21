package com.example.crmbackend.controller;

import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.FidelisationResponse;
import com.example.crmbackend.service.interfaces.FidelisationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/fidelisation")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class FidelisationController {
    private final FidelisationService service;

    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL')")
    public ApiResponse<FidelisationResponse> getByClient(@PathVariable Long clientId) {
        return ApiResponse.ok(service.getByClient(clientId));
    }
}
