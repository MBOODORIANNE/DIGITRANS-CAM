package com.example.crmbackend.service;

import com.example.crmbackend.dto.request.ClientRequest;
import com.example.crmbackend.dto.response.ClientResponse;
import com.example.crmbackend.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClientService {
    Page<ClientResponse> search(String q, Client.Segment segment, String ville, Pageable pageable);
    ClientResponse getById(Long id);
    ClientResponse create(ClientRequest req);
    ClientResponse update(Long id, ClientRequest req);
    void delete(Long id);
}
