package com.example.crmbackend.repository;

import com.example.crmbackend.entity.Interaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {
    Page<Interaction> findByClientId(Long clientId, Pageable pageable);
}
