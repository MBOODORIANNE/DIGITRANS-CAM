package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.request.ClientRequest;
import com.example.crmbackend.dto.response.ClientResponse;
import com.example.crmbackend.entity.Client;
import com.example.crmbackend.exception.BusinessException;
import com.example.crmbackend.exception.ResourceNotFoundException;
import com.example.crmbackend.mapper.ClientMapper;
import com.example.crmbackend.repository.ClientRepository;
import com.example.crmbackend.service.interfaces.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository repo;
    private final ClientMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<ClientResponse> search(String q, Client.Segment segment, String ville, Pageable pageable) {
        return repo.search(q, segment, ville, pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ClientResponse getById(Long id) {
        Client c = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable : " + id));
        return mapper.toResponse(c);
    }

    @Override
    public ClientResponse create(ClientRequest req) {
        if (req.getEmail() != null && repo.existsByEmail(req.getEmail())) {
            throw new BusinessException("Un client existe déjà avec cet email.");
        }
        Client saved = repo.save(mapper.toEntity(req));
        return mapper.toResponse(saved);
    }

    @Override
    public ClientResponse update(Long id, ClientRequest req) {
        Client c = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable : " + id));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }

    @Override
    public void delete(Long id) {
        Client c = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable : " + id));
        c.setActif(false); // soft delete
        repo.save(c);
    }
}
