package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.request.InteractionRequest;
import com.example.crmbackend.dto.response.InteractionResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.entity.Interaction;
import com.example.crmbackend.entity.User;
import com.example.crmbackend.exception.ResourceNotFoundException;
import com.example.crmbackend.mapper.InteractionMapper;
import com.example.crmbackend.repository.ClientRepository;
import com.example.crmbackend.repository.InteractionRepository;
import com.example.crmbackend.repository.UserRepository;
import com.example.crmbackend.service.interfaces.InteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class InteractionServiceImpl implements InteractionService {
    private final InteractionRepository repo;
    private final ClientRepository clientRepo;
    private final UserRepository userRepo;
    private final InteractionMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<InteractionResponse> listByClient(Long clientId, Pageable pageable) {
        return repo.findByClientId(clientId, pageable).map(mapper::toResponse);
    }

    @Override
    public InteractionResponse create(InteractionRequest req, String userEmail) {
        Client client = clientRepo.findById(req.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable"));
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));

        Interaction i = new Interaction();
        i.setClient(client);
        i.setUser(user);
        i.setType(req.getType());
        i.setContenu(req.getContenu());

        return mapper.toResponse(repo.save(i));
    }
}
