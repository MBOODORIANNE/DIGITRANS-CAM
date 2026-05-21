package com.example.crmbackend.dto.request;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Data
public class LigneCommandeRequest {
    @NotBlank private String libelleProduit;
    @NotNull @Min(1) private Integer quantite;
    @NotNull @DecimalMin("0.0") private BigDecimal prixUnitaire;
}
