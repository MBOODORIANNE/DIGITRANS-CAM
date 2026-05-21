package com.example.crmbackend.controller;

import com.example.crmbackend.dto.request.RestaurantRequest;
import com.example.crmbackend.dto.response.ApiResponse;
import com.example.crmbackend.dto.response.RestaurantResponse;
import com.example.crmbackend.service.interfaces.RestaurantService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class RestaurantController {
    private final RestaurantService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    public ApiResponse<Page<RestaurantResponse>> list(Pageable pageable) {
        return ApiResponse.ok(service.list(pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','COMMERCIAL','CAISSIER')")
    public ApiResponse<RestaurantResponse> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<RestaurantResponse> create(@Valid @RequestBody RestaurantRequest req) {
        return ApiResponse.ok(service.create(req), "Restaurant créé");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ApiResponse<RestaurantResponse> update(@PathVariable Long id, @Valid @RequestBody RestaurantRequest req) {
        return ApiResponse.ok(service.update(id, req), "Restaurant mis à jour");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
