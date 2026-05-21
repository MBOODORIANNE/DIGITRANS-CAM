package com.example.crmbackend.service.interfaces;

import com.example.crmbackend.dto.request.InteractionRequest;
import com.example.crmbackend.dto.response.InteractionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InteractionService {
    Page<InteractionResponse> listByClient(Long clientId, Pageable pageable);
    InteractionResponse create(InteractionRequest req, String userEmail);
}
