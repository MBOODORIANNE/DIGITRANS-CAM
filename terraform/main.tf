# ============================================================
# DIGITRANS-CM — Infrastructure as Code (IaC)
# Terraform — AWS af-south-1 (Cape Town)
# Module CRM SavoirManger
# Auteur : Équipe CRM — Leukefack Christian
# ============================================================

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend S3 pour stocker l'état Terraform en équipe
  backend "s3" {
   bucket = "digitrans-terraform-state-678865"
    key    = "crm/terraform.tfstate"
    region = "af-south-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "DIGITRANS-CM"
      Module      = "CRM-SavoirManger"
      Environment = var.environment
      Team        = "CAMTECH-Solutions"
      ManagedBy   = "Terraform"
    }
  }
}

# ============================================================
# VPC — Réseau isolé pour le CRM
# ============================================================
resource "aws_vpc" "crm_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "digitrans-crm-vpc" }
}

# Sous-réseau public (frontend, load balancer)
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.crm_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
  tags = { Name = "crm-public-subnet-a" }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.crm_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
  tags = { Name = "crm-public-subnet-b" }
}

# Sous-réseau privé (backend, base de données)
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.crm_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}a"
  tags = { Name = "crm-private-subnet-a" }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.crm_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.aws_region}b"
  tags = { Name = "crm-private-subnet-b" }
}

# Internet Gateway
resource "aws_internet_gateway" "crm_igw" {
  vpc_id = aws_vpc.crm_vpc.id
  tags   = { Name = "crm-internet-gateway" }
}

# Route table publique
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.crm_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.crm_igw.id
  }
  tags = { Name = "crm-public-route-table" }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_rt.id
}

# ============================================================
# Security Groups
# ============================================================
resource "aws_security_group" "alb_sg" {
  name        = "crm-alb-sg"
  description = "Security group du Load Balancer CRM"
  vpc_id      = aws_vpc.crm_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP public"
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS public"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "crm-alb-security-group" }
}

resource "aws_security_group" "backend_sg" {
  name        = "crm-backend-sg"
  description = "Security group du backend Spring Boot"
  vpc_id      = aws_vpc.crm_vpc.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
    description     = "Accès depuis ALB uniquement"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = { Name = "crm-backend-security-group" }
}

# ============================================================
# Application Load Balancer (Haute disponibilité)
# ============================================================
resource "aws_lb" "crm_alb" {
  name               = "digitrans-crm-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  enable_deletion_protection = false

  tags = { Name = "digitrans-crm-load-balancer" }
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "crm-backend-tg"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.crm_vpc.id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = "/actuator/health"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 10
    interval            = 30
    matcher             = "200"
  }
  tags = { Name = "crm-backend-target-group" }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.crm_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}

# ============================================================
# ECS Cluster (Conteneurs Spring Boot)
# ============================================================
resource "aws_ecs_cluster" "crm_cluster" {
  name = "digitrans-crm-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  tags = { Name = "digitrans-crm-ecs-cluster" }
}

# ECR — Registre d'images Docker
resource "aws_ecr_repository" "backend" {
  name                 = "digitrans-crm-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  tags = { Name = "crm-backend-ecr" }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "digitrans-crm-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  tags = { Name = "crm-frontend-ecr" }
}

# ============================================================
# ElastiCache Redis (Cache distribué — KPI latence)
# ============================================================
resource "aws_elasticache_subnet_group" "redis_subnet" {
  name       = "crm-redis-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]
}

resource "aws_elasticache_replication_group" "redis" {
  replication_group_id = "digitrans-crm-redis"
  description          = "Cache Redis pour le module CRM DIGITRANS-CM"

  node_type            = "cache.t3.micro"
  num_cache_clusters   = 2
  port                 = 6379

  subnet_group_name    = aws_elasticache_subnet_group.redis_subnet.name
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  tags = { Name = "digitrans-crm-redis-cache" }
}

# ============================================================
# S3 — Fichiers statiques Angular + CloudFront CDN
# ============================================================
resource "aws_s3_bucket" "frontend_assets" {
  bucket = "digitrans-crm-frontend-${var.environment}"
  tags   = { Name = "crm-frontend-assets" }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend_assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_distribution" "frontend_cdn" {
  origin {
    domain_name              = aws_s3_bucket.frontend_assets.bucket_regional_domain_name
    origin_id                = "S3-digitrans-crm-frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  default_root_object = "index.html"
  comment             = "CDN DIGITRANS-CM CRM Frontend"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-digitrans-crm-frontend"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # SPA fallback — toutes les routes vers index.html
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = { Name = "digitrans-crm-cloudfront" }
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "crm-s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ============================================================
# CloudWatch — Monitoring & Alertes (KPI disponibilité)
# ============================================================
resource "aws_cloudwatch_metric_alarm" "api_latency" {
  alarm_name          = "crm-api-latency-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "TargetResponseTime"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Average"
  threshold           = 0.2   # 200ms — KPI cible
  alarm_description   = "Alerte : latence API CRM > 200ms"

  dimensions = {
    LoadBalancer = aws_lb.crm_alb.arn_suffix
  }

  tags = { Name = "crm-latency-alarm" }
}

resource "aws_cloudwatch_metric_alarm" "ecs_cpu" {
  alarm_name          = "crm-ecs-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Alerte : CPU ECS CRM > 80%"

  dimensions = {
    ClusterName = aws_ecs_cluster.crm_cluster.name
  }

  tags = { Name = "crm-cpu-alarm" }
}
