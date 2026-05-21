package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.CommandeRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.CommandeResponse;
import com.example.crmbackend.entity.Commande;
import com.example.crmbackend.service.interfaces.CommandeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/commandes")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CommandeController {
    private final CommandeService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    public ApiResponse<Page<CommandeResponse>> list(@RequestParam(required = false) Commande.StatutCommande statut, Pageable pageable) {
        return ApiResponse.ok(service.list(statut, pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    public ApiResponse<CommandeResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CAISSIER')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CommandeResponse> create(@Valid @RequestBody CommandeRequest req) {
        return ApiResponse.ok(service.create(req), "Commande créée");
    }
}
