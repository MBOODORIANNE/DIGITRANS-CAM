package com.example.crmbackend.service.impl;

import com.example.crmbackend.dto.request.RestaurantRequest;
import com.example.crmbackend.dto.response.RestaurantResponse;
import com.example.crmbackend.entity.Restaurant;
import com.example.crmbackend.exception.ResourceNotFoundException;
import com.example.crmbackend.mapper.RestaurantMapper;
import com.example.crmbackend.repository.RestaurantRepository;
import com.example.crmbackend.service.interfaces.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository repo;
    private final RestaurantMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<RestaurantResponse> list(Pageable pageable) {
        return repo.findAll(pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public RestaurantResponse getById(Long id) {
        Restaurant r = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Restaurant introuvable"));
        return mapper.toResponse(r);
    }

    @Override
    public RestaurantResponse create(RestaurantRequest req) {
        Restaurant r = mapper.toEntity(req);
        return mapper.toResponse(repo.save(r));
    }

    @Override
    public RestaurantResponse update(Long id, RestaurantRequest req) {
        Restaurant r = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Restaurant introuvable"));
        mapper.updateEntity(req, r);
        return mapper.toResponse(repo.save(r));
    }

    @Override
    public void delete(Long id) {
        Restaurant r = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Restaurant introuvable"));
        r.setActif(false);
        repo.save(r);
    }
}
