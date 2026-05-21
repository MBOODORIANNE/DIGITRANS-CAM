package com.example.crmbackend.dto.response;

import com.example.crmbackend.entity.Interaction;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class InteractionResponse {
    private Long id;
    private Long clientId;
    private Long userId;
    private Interaction.TypeInteraction type;
    private String contenu;
    private LocalDateTime dateInteraction;
}
