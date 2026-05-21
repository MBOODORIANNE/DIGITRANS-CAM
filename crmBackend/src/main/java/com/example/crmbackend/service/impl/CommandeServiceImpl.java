package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.request.CommandeRequest;
import com.example.crmbackend.dto.request.LigneCommandeRequest;
import com.example.crmbackend.dto.response.CommandeResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.entity.Commande;
import com.example.crmbackend.entity.LigneCommande;
import com.example.crmbackend.entity.Restaurant;
import com.example.crmbackend.exception.ResourceNotFoundException;
import com.example.crmbackend.mapper.CommandeMapper;
import com.example.crmbackend.repository.ClientRepository;
import com.example.crmbackend.repository.CommandeRepository;
import com.example.crmbackend.repository.RestaurantRepository;
import com.example.crmbackend.service.interfaces.CommandeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class CommandeServiceImpl implements CommandeService {
    private final CommandeRepository repo;
    private final ClientRepository clientRepo;
    private final RestaurantRepository restaurantRepo;
    private final CommandeMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<CommandeResponse> list(Commande.StatutCommande statut, Pageable pageable) {
        if (statut == null) return repo.findAll(pageable).map(mapper::toResponse);
        return repo.findByStatut(statut, pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public CommandeResponse getById(Long id) {
        Commande c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Commande introuvable"));
        return mapper.toResponse(c);
    }

    @Override
    public CommandeResponse create(CommandeRequest req) {
        Client client = clientRepo.findById(req.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable"));
        Restaurant restaurant = restaurantRepo.findById(req.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant introuvable"));

        Commande c = new Commande();
        c.setClient(client);
        c.setRestaurant(restaurant);
        c.setReference("CMD-" + System.currentTimeMillis());

        BigDecimal total = BigDecimal.ZERO;
        for (LigneCommandeRequest ligneReq : req.getLignes()) {
            LigneCommande ligne = mapper.toEntity(ligneReq);
            c.addLigne(ligne);
            BigDecimal subTotal = ligne.getPrixUnitaire().multiply(BigDecimal.valueOf(ligne.getQuantite()));
            total = total.add(subTotal);
        }
        c.setMontantTotal(total);
        return mapper.toResponse(repo.save(c));
    }
}
