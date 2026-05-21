import { Restaurant } from './restaurant.model';

export interface User {
  id?: number;
  email: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'MANAGER' | 'COMMERCIAL' | 'CAISSIER';
  restaurant?: Restaurant;
  actif?: boolean;
}
