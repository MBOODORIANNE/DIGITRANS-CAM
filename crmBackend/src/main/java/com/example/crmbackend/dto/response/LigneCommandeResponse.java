package com.example.crmbackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class LigneCommandeResponse {
    private Long id;
    private String libelleProduit;
    private Integer quantite;
    private BigDecimal prixUnitaire;
}
