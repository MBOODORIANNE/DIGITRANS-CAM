package com.example.crmbackend.dto.request;

import com.example.crmbackend.entity.Client;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClientRequest {
    @NotBlank @Size(max = 100) private String nom;
    @NotBlank @Size(max = 100) private String prenom;
    @Email @Size(max = 150) private String email;
    @NotBlank @Pattern(regexp = "^\\+237[0-9]{9}$", message = "Numéro camerounais attendu : +237XXXXXXXXX") private String telephone;
    @NotBlank @Size(max = 80) private String ville;
    private String adresse;
    private Client.Segment segment;
}
