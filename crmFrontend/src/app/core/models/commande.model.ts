import { Client } from './client.model';
import { Restaurant } from './restaurant.model';

export interface LigneCommande {
  id?: number;
  nomProduit: string;
  quantite: number;
  prixUnitaire: number;
  sousTotal?: number;
}

export interface Commande {
  id?: number;
  reference?: string;
  client: Client;
  restaurant: Restaurant;
  lignes: LigneCommande[];
  montantTotal?: number;
  dateCommande?: string;
  statut?: 'EN_COURS' | 'LIVREE' | 'ANNULEE';
}
