package com.example.crmbackend.repository;

import com.example.crmbackend.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByTelephone(String telephone);
    boolean existsByEmail(String email);

    @Query("""
        SELECT c FROM Client c
        WHERE (:q IS NULL OR
               LOWER(c.nom) LIKE LOWER(CONCAT('%', :q, '%')) OR
               LOWER(c.prenom) LIKE LOWER(CONCAT('%', :q, '%')) OR
               c.telephone LIKE CONCAT('%', :q, '%'))
          AND (:segment IS NULL OR c.segment = :segment)
          AND (:ville IS NULL OR LOWER(c.ville) = LOWER(:ville))
          AND c.actif = true
    """)
    Page<Client> search(@Param("q") String q, @Param("segment") Client.Segment segment, @Param("ville") String ville, Pageable pageable);
}
