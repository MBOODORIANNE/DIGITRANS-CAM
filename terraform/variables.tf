# ============================================================
# DIGITRANS-CM — Terraform Variables
# ============================================================

variable "aws_region" {
  description = "Région AWS — af-south-1 choisie pour minimiser la latence depuis Douala (~50ms)"
  type        = string
  default     = "af-south-1"
}

variable "environment" {
  description = "Environnement de déploiement"
  type        = string
  default     = "production"
  validation {
    condition     = contains(["production", "staging", "dev"], var.environment)
    error_message = "L'environnement doit être : production, staging ou dev."
  }
}

variable "vpc_cidr" {
  description = "CIDR block du VPC CRM"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_instance_class" {
  description = "Classe d'instance RDS MySQL"
  type        = string
  default     = "db.t3.micro"
}

variable "ecs_task_cpu" {
  description = "CPU alloué à la tâche ECS (unités)"
  type        = number
  default     = 512
}

variable "ecs_task_memory" {
  description = "Mémoire allouée à la tâche ECS (MiB)"
  type        = number
  default     = 1024
}

variable "backend_desired_count" {
  description = "Nombre de conteneurs backend souhaités"
  type        = number
  default     = 2  # Haute disponibilité multi-AZ
}
