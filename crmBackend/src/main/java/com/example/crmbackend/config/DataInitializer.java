package com.example.crmbackend.config;

import com.example.crmbackend.entity.Role;
import com.example.crmbackend.entity.User;
import com.example.crmbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        // Créer l'admin par défaut s'il n'existe pas
        if (userRepository.findByEmail("admin@digitrans.cm").isEmpty()) {
            User admin = new User();
            admin.setNom("Admin");
            admin.setPrenom("Système");
            admin.setEmail("admin@digitrans.cm");
            admin.setPasswordHash(passwordEncoder.encode("Admin@2025!"));
            admin.setRole(Role.ADMIN);
            admin.setActif(true);
            userRepository.save(admin);
            log.info(">>> Utilisateur admin créé : admin@digitrans.cm / Admin@2025!");
        }

        // Créer un commercial de test
        if (userRepository.findByEmail("commercial@digitrans.cm").isEmpty()) {
            User commercial = new User();
            commercial.setNom("Dupont");
            commercial.setPrenom("Jean");
            commercial.setEmail("commercial@digitrans.cm");
            commercial.setPasswordHash(passwordEncoder.encode("Commercial@2025!"));
            commercial.setRole(Role.COMMERCIAL);
            commercial.setActif(true);
            userRepository.save(commercial);
            log.info(">>> Utilisateur commercial créé : commercial@digitrans.cm / Commercial@2025!");
        }
    }
}
