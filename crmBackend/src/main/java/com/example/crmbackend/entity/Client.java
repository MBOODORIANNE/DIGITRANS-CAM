package com.example.crmbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client extends BaseEntity {
    @Column(nullable = false, length = 100)
    private String nom;
    @Column(nullable = false, length = 100)
    private String prenom;
    @Column(unique = true, length = 150)
    private String email;
    @Column(nullable = false, length = 20)
    private String telephone;
    @Column(nullable = false, length = 80)
    private String ville;
    @Column(columnDefinition = "TEXT")
    private String adresse;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Segment segment = Segment.OCCASIONNEL;
    @Column(name = "date_inscription", nullable = false)
    private LocalDateTime dateInscription = LocalDateTime.now();
    @Column(nullable = false)
    private Boolean actif = true;
    public enum Segment { VIP, REGULIER, OCCASIONNEL }
}
