package com.example.crmbackend.dto.response;

import com.example.crmbackend.entity.Commande;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class CommandeResponse {
    private Long id;
    private String reference;
    private Long clientId;
    private Long restaurantId;
    private BigDecimal montantTotal;
    private Commande.StatutCommande statut;
    private LocalDateTime dateCommande;
    private List<LigneCommandeResponse> lignes;
}
