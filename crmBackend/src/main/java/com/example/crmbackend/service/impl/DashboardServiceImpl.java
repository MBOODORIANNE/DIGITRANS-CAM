package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.response.DashboardResponse;
import com.example.crmbackend.mapper.ClientMapper;
import com.example.crmbackend.repository.ClientRepository;
import com.example.crmbackend.repository.CommandeRepository;
import com.example.crmbackend.service.interfaces.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final CommandeRepository commandeRepo;
    private final ClientRepository clientRepo;
    private final ClientMapper clientMapper;

    @Override
    public DashboardResponse getStats() {
        // MVP: we mock some data and use basic counts
        long nbCommandes = commandeRepo.count();
        long nbClients = clientRepo.count();

        return DashboardResponse.builder()
                .caMois(BigDecimal.valueOf(1500000))
                .nbCommandes(nbCommandes)
                .nouveauxClients(nbClients)
                .panierMoyen(BigDecimal.valueOf(35000))
                .ventesDerniers30Jours(new HashMap<>())
                .top5Clients(Collections.emptyList())
                .build();
    }
}
