export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  email?: string;
  telephone: string;
  ville: string;
  adresse?: string;
  segment?: 'VIP' | 'REGULIER' | 'OCCASIONNEL';
  dateInscription?: string;
  actif?: boolean;
}
