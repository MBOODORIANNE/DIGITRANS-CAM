package com.example.crmbackend.dto.response;

import com.example.crmbackend.entity.Client;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class ClientResponse {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String ville;
    private String adresse;
    private Client.Segment segment;
    private LocalDateTime dateInscription;
    private Boolean actif;
}
