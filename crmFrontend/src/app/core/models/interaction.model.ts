import { Client } from './client.model';
import { User } from './user.model';

export interface Interaction {
  id?: number;
  client: Client;
  utilisateur: User;
  type: 'APPEL' | 'EMAIL' | 'REUNION' | 'VISITE';
  notes: string;
  dateInteraction?: string;
}
