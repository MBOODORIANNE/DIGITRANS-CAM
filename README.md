# DIGITRANS-CM — Module CRM SavoirManger

**Projet :** Digitalisation et Transformation Numérique au Cameroun  
**Client :** AGROCAM S.A. | **Prestataire :** CAMTECH SOLUTIONS S.A.  
**Équipe :** Leukefack Christian · Mboo Atangana · Gaouaffo Nanfah  
**Stack :** Spring Boot 4 (Java 21) + Angular + MySQL + Redis  
**Cloud :** AWS af-south-1 (Cape Town) — latence ~50ms depuis Douala  

---

## Structure du projet

```
digitrans-cm-crm/
├── backend/                    ← API REST Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── docker/
│       ├── Dockerfile.backend
│       ├── Dockerfile.frontend
│       ├── docker-compose.yml
│       ├── nginx.conf
│       └── .env.example
├── frontend/                   ← Application Angular
│   └── src/
├── terraform/                  ← Infrastructure as Code (AWS)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── kubernetes/                 ← Orchestration conteneurs
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── .github/workflows/
│   └── ci-cd.yml               ← Pipeline CI/CD GitHub Actions
└── README.md
```

---

## Lancer en local (développement)

### Prérequis
- Docker Desktop installé
- Java 21 + Maven (pour développement)
- Node.js 20 + Angular CLI (pour développement)

### Démarrage rapide avec Docker Compose

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_ORG/digitrans-cm-crm.git
cd digitrans-cm-crm

# 2. Copier et configurer les variables d'environnement
cp backend/docker/.env.example backend/docker/.env
# Modifier les valeurs dans .env si nécessaire

# 3. Lancer toute la stack (backend + frontend + MySQL + Redis)
cd backend/docker
docker compose up --build

# 4. Accès aux services
# Frontend Angular  : http://localhost:80
# API Spring Boot   : http://localhost:8080
# Swagger UI        : http://localhost:8080/swagger-ui/index.html
# Adminer (BDD)     : docker compose --profile dev up → http://localhost:8081
```

---

## Déploiement sur AWS (Production)

### Prérequis AWS
- AWS CLI configuré (`aws configure`)
- Terraform >= 1.6.0 installé
- Compte AWS avec droits ECS, ECR, VPC, S3, CloudFront

### Étape 1 — Provisionner l'infrastructure avec Terraform

```bash
cd terraform/

# Initialiser Terraform
terraform init

# Vérifier le plan d'infrastructure
terraform plan -var="environment=production"

# Appliquer (crée VPC, ECS, ECR, Redis, CloudFront...)
terraform apply -var="environment=production"

# Récupérer les URLs créées
terraform output
```

### Étape 2 — Pousser les images sur ECR

```bash
# S'authentifier sur ECR
aws ecr get-login-password --region af-south-1 | \
  docker login --username AWS --password-stdin \
  VOTRE_ACCOUNT_ID.dkr.ecr.af-south-1.amazonaws.com

# Builder et pousser le backend
docker build -f backend/docker/Dockerfile.backend -t digitrans-crm-backend ./backend
docker tag digitrans-crm-backend:latest \
  VOTRE_ACCOUNT_ID.dkr.ecr.af-south-1.amazonaws.com/digitrans-crm-backend:latest
docker push VOTRE_ACCOUNT_ID.dkr.ecr.af-south-1.amazonaws.com/digitrans-crm-backend:latest
```

### Étape 3 — CI/CD automatique (GitHub Actions)

Tout push sur `main` déclenche automatiquement :
1. Tests JUnit (couverture ≥ 80% obligatoire)
2. Build images Docker
3. Push sur AWS ECR
4. Déploiement sur ECS af-south-1

**Secrets GitHub à configurer** (Settings → Secrets → Actions) :
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

---

## KPIs du projet

| KPI | Cible | Comment le mesurer |
|-----|-------|--------------------|
| Couverture des tests | ≥ 80% | Rapport JaCoCo (CI/CD) |
| Bugs critiques / sprint | ≤ 3 | Revues de code GitHub |
| Temps de déploiement CI/CD | ≤ 15 min | Durée du workflow GitHub Actions |
| Disponibilité offline-first | ≥ 70% | Tests de déconnexion réseau |
| Vélocité équipe | ≥ 30 SP/sprint | Tableau Kanban |

---

## Contraintes réglementaires respectées

- **Loi n°2010/012** : données clients MySQL hébergées on-premise Douala
- **Latence** : AWS af-south-1 (Cape Town) choisi → ~50ms depuis Douala vs ~200ms Europe
- **Chiffrement** : TLS 1.3 en transit, JWT pour l'authentification
- **Offline-first** : Service Worker Angular pour zones sans connexion stable

---

## Membres de l'équipe & contributions

| Membre | Rôle | Contributions principales |
|--------|------|--------------------------|
| Leukefack Christian | Back-end | Entités JPA, Spring Security, JWT, déploiement AWS |
| Mboo Atangana | Back-end | CRUD clients, fidélité, réclamations, tests, CI/CD |
| Gaouaffo Nanfah | Front-end + Chef de projet | Angular, offline-first, rapport collectif |
