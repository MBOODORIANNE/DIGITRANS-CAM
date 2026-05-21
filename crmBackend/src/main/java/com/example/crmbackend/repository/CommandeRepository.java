package com.example.crmbackend.repository;

import com.example.crmbackend.entity.Commande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    Page<Commande> findByStatut(Commande.StatutCommande statut, Pageable pageable);
    boolean existsByReference(String reference);
}
