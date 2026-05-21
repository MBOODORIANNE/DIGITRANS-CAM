package com.example.crmbackend.dto.request;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class RestaurantRequest {
    @NotBlank @Size(max = 150) private String nom;
    @NotBlank @Size(max = 80) private String ville;
    private String adresse;
    private String telephone;
    @NotNull private Boolean actif;
}
