# ============================================================
# DIGITRANS-CM — Terraform Outputs
# Valeurs exportées après terraform apply
# ============================================================

output "alb_dns_name" {
  description = "URL publique du Load Balancer (accès à l'API CRM)"
  value       = aws_lb.crm_alb.dns_name
}

output "cloudfront_url" {
  description = "URL CDN CloudFront (accès au frontend Angular)"
  value       = "https://${aws_cloudfront_distribution.frontend_cdn.domain_name}"
}

output "ecr_backend_url" {
  description = "URL du registre ECR pour les images backend"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_url" {
  description = "URL du registre ECR pour les images frontend"
  value       = aws_ecr_repository.frontend.repository_url
}

output "redis_endpoint" {
  description = "Endpoint Redis ElastiCache (interne VPC)"
  value       = aws_elasticache_replication_group.redis.primary_endpoint_address
  sensitive   = true
}

output "ecs_cluster_name" {
  description = "Nom du cluster ECS"
  value       = aws_ecs_cluster.crm_cluster.name
}

output "vpc_id" {
  description = "ID du VPC CRM"
  value       = aws_vpc.crm_vpc.id
}
