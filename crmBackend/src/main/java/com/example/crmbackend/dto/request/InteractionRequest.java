package com.example.crmbackend.dto.request;

import com.example.crmbackend.entity.Interaction;
import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class InteractionRequest {
    @NotNull private Long clientId;
    @NotNull private Interaction.TypeInteraction type;
    @NotBlank private String contenu;
}
