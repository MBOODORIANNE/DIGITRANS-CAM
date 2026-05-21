package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.response.FidelisationResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.entity.ProgrammeFidelite;
import com.example.crmbackend.exception.ResourceNotFoundException;
import com.example.crmbackend.repository.ClientRepository;
import com.example.crmbackend.repository.ProgrammeFideliteRepository;
import com.example.crmbackend.service.interfaces.FidelisationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FidelisationServiceImpl implements FidelisationService {
    private final ProgrammeFideliteRepository repo;
    private final ClientRepository clientRepo;

    @Override
    @Transactional(readOnly = true)
    public FidelisationResponse getByClient(Long clientId) {
        ProgrammeFidelite pf = repo.findByClientId(clientId).orElseGet(() -> {
            Client c = clientRepo.findById(clientId).orElseThrow(() -> new ResourceNotFoundException("Client introuvable"));
            ProgrammeFidelite newPf = new ProgrammeFidelite();
            newPf.setClient(c);
            newPf.setPoints(0);
            newPf.setNiveau(ProgrammeFidelite.NiveauFidelite.BRONZE);
            return repo.save(newPf);
        });

        return FidelisationResponse.builder()
                .id(pf.getId())
                .clientId(pf.getClient().getId())
                .points(pf.getPoints())
                .niveau(pf.getNiveau())
                .lastUpdate(pf.getLastUpdate())
                .build();
    }

    @Override
    public void updatePoints(Long clientId, int pointsToAdd) {
        ProgrammeFidelite pf = repo.findByClientId(clientId).orElseGet(() -> {
            Client c = clientRepo.findById(clientId).orElseThrow(() -> new ResourceNotFoundException("Client introuvable"));
            ProgrammeFidelite newPf = new ProgrammeFidelite();
            newPf.setClient(c);
            return newPf;
        });

        int newPoints = (pf.getPoints() == null ? 0 : pf.getPoints()) + pointsToAdd;
        pf.setPoints(newPoints);

        if (newPoints >= 2000) pf.setNiveau(ProgrammeFidelite.NiveauFidelite.PLATINE);
        else if (newPoints >= 1000) pf.setNiveau(ProgrammeFidelite.NiveauFidelite.OR);
        else if (newPoints >= 500) pf.setNiveau(ProgrammeFidelite.NiveauFidelite.ARGENT);
        else pf.setNiveau(ProgrammeFidelite.NiveauFidelite.BRONZE);

        repo.save(pf);
    }
}
