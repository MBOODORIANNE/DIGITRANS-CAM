package com.example.crmbackend.service;

import com.example.crmbackend.dto.response.FidelisationResponse;

public interface FidelisationService {
    FidelisationResponse getByClient(Long clientId);
    void updatePoints(Long clientId, int pointsToAdd);
}
