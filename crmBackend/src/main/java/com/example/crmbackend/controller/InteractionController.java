package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.InteractionRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.InteractionResponse;
import com.example.crmbackend.service.interfaces.InteractionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/interactions")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class InteractionController {
    private final InteractionService service;

    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL')")
    public ApiResponse<Page<InteractionResponse>> listByClient(@PathVariable Long clientId, Pageable pageable) {
        return ApiResponse.ok(service.listByClient(clientId, pageable));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InteractionResponse> create(@Valid @RequestBody InteractionRequest req, Authentication auth) {
        return ApiResponse.ok(service.create(req, auth.getName()), "Interaction enregistrée");
    }
}
