package com.example.crmbackend.dto.request;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
public class CommandeRequest {
    @NotNull private Long clientId;
    @NotNull private Long restaurantId;
    @NotEmpty private List<LigneCommandeRequest> lignes;
}
