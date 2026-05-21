package com.example.crmbackend.service.interfaces;

import com.example.crmbackend.dto.request.CommandeRequest;
import com.example.crmbackend.dto.response.CommandeResponse;
import com.example.crmbackend.entity.Commande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommandeService {
    Page<CommandeResponse> list(Commande.StatutCommande statut, Pageable pageable);
    CommandeResponse getById(Long id);
    CommandeResponse create(CommandeRequest req);
}
