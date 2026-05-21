package com.example.crmbackend.repository;

import com.example.crmbackend.entity.ProgrammeFidelite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgrammeFideliteRepository extends JpaRepository<ProgrammeFidelite, Long> {
    Optional<ProgrammeFidelite> findByClientId(Long clientId);
}
