package com.example.crmbackend.dto.response;

import com.example.crmbackend.entity.ProgrammeFidelite;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class FidelisationResponse {
    private Long id;
    private Long clientId;
    private Integer points;
    private ProgrammeFidelite.NiveauFidelite niveau;
    private LocalDateTime lastUpdate;
}
