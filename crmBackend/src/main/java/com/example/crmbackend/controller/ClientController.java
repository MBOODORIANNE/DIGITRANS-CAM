package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.ClientRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.ClientResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.service.interfaces.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
@Tag(name = "Clients", description = "Gestion des clients AGROCAM")
@SecurityRequirement(name = "bearerAuth")
public class ClientController {

    private final ClientService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    @Operation(summary = "Liste paginée + filtres")
    public ApiResponse<Page<ClientResponse>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Client.Segment segment,
            @RequestParam(required = false) String ville,
            Pageable pageable) {
        return ApiResponse.ok(service.search(q, segment, ville, pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    public ApiResponse<ClientResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ClientResponse> create(@Valid @RequestBody ClientRequest req) {
        return ApiResponse.ok(service.create(req), "Client créé avec succès");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL')")
    public ApiResponse<ClientResponse> update(@PathVariable Long id, @Valid @RequestBody ClientRequest req) {
        return ApiResponse.ok(service.update(id, req), "Client mis à jour");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
