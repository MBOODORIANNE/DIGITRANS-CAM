package com.example.crmbackend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class RestaurantResponse {
    private Long id;
    private String nom;
    private String ville;
    private String adresse;
    private String telephone;
    private Boolean actif;
}
