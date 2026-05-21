package com.example.crmbackend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class DashboardResponse {
    private BigDecimal caMois;
    private Long nbCommandes;
    private Long nouveauxClients;
    private BigDecimal panierMoyen;
    private Map<String, BigDecimal> ventesDerniers30Jours;
    private List<ClientResponse> top5Clients;
}
