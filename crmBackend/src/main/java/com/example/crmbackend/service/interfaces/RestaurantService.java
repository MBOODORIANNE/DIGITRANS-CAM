package com.example.crmbackend.service.interfaces;

import com.example.crmbackend.dto.request.RestaurantRequest;
import com.example.crmbackend.dto.response.RestaurantResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RestaurantService {
    Page<RestaurantResponse> list(Pageable pageable);
    RestaurantResponse getById(Long id);
    RestaurantResponse create(RestaurantRequest req);
    RestaurantResponse update(Long id, RestaurantRequest req);
    void delete(Long id);
}
