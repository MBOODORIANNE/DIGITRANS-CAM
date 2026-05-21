import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteractionsService } from '../../../core/services/interactions.service';
import { ClientsService } from '../../../core/services/clients.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-interaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Journal des Interactions CRM</h1>
        <p class="mt-1 text-sm text-gray-500">Suivi complet des échanges commerciaux et support avec vos clients.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Clients selection panel -->
      <div class="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 overflow-hidden flex flex-col h-[600px]">
        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sélectionner un Client</label>
          <input type="text" [(ngModel)]="clientSearchQuery" (input)="filterClients()" placeholder="Rechercher un client..."
            class="block w-full border border-gray-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
        </div>
        
        <div class="flex-1 overflow-y-auto space-y-2 pr-1">
          <button *ngFor="let c of filteredClients" (click)="selectClient(c)" [ngClass]="selectedClient?.id === c.id ? 'bg-emerald-50/70 border-emerald-500/30' : 'bg-white hover:bg-slate-50 border-gray-100'"
            class="w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              {{ c.prenom[0] }}{{ c.nom[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 truncate">{{ c.prenom }} {{ c.nom }}</p>
              <p class="text-xs text-gray-500 truncate">{{ c.telephone }}</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Timeline panel -->
      <div class="lg:col-span-8 space-y-6">
        <div *ngIf="selectedClient; else selectClientPrompt" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[600px]">
          <!-- Client Header info -->
          <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900">{{ selectedClient.prenom }} {{ selectedClient.nom }}</h2>
              <p class="text-xs text-gray-500">Ville: {{ selectedClient.ville }} | Segment: {{ selectedClient.segment }}</p>
            </div>
            
            <button (click)="openAddModal()"
              class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Nouvelle Interaction
            </button>
          </div>

          <!-- Timeline content scrollable -->
          <div class="flex-1 overflow-y-auto space-y-6 pr-2">
            <div *ngIf="interactions.length === 0" class="text-center py-12 text-gray-400">
              <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <p class="mt-2 text-sm">Aucune interaction enregistrée pour ce client.</p>
            </div>

            <div *ngFor="let it of interactions" class="relative pl-6 border-l border-gray-200 pb-2">
              <!-- Icon or dot status indicator -->
              <span class="absolute -left-2.5 top-1 bg-white border-2 border-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                💬
              </span>
              <div class="bg-slate-50/50 rounded-xl p-4 border border-slate-100 hover:border-emerald-100 transition-colors">
                <div class="flex justify-between items-start mb-2">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {{ it.type }}
                  </span>
                  <span class="text-xs text-gray-400">{{ it.dateInteraction | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed">{{ it.contenu }}</p>
                <div class="mt-2 text-xs text-gray-400 text-right">
                  Enregistré par: <span class="font-semibold text-gray-600">{{ it.userName || 'Agent Commercial' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ng-template #selectClientPrompt>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center h-[600px] flex flex-col items-center justify-center">
            <svg class="h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            <h3 class="text-lg font-bold text-gray-900 mb-1">Aucun client sélectionné</h3>
            <p class="text-sm text-gray-500 max-w-sm">Choisissez un client dans le panneau de gauche pour consulter son historique d'interactions ou ajouter un nouvel échange.</p>
          </div>
        </ng-template>
      </div>
    </div>

    <!-- Create Interaction Modal -->
    <div *ngIf="showAddModal && selectedClient" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Nouvel Échange - {{ selectedClient.prenom }}</h2>
          <button (click)="closeAddModal()" class="text-gray-400 hover:text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <form (ngSubmit)="saveInteraction()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Type de contact</label>
            <select [(ngModel)]="newInteraction.type" name="type" required
              class="mt-1 block w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <option value="APPEL">Appel Téléphonique</option>
              <option value="EMAIL">Email</option>
              <option value="REUNION">Réunion Commerciale</option>
              <option value="AUTRE">Autre</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Contenu / Notes</label>
            <textarea [(ngModel)]="newInteraction.contenu" name="contenu" rows="4" required
              placeholder="Saisissez les détails de l'interaction..."
              class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button type="button" (click)="closeAddModal()" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium text-white shadow-sm transition-colors">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class InteractionListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  selectedClient?: Client;
  interactions: any[] = [];
  
  clientSearchQuery = '';
  showAddModal = false;
  newInteraction: any = { type: 'APPEL', contenu: '' };

  constructor(
    private clientsService: ClientsService,
    private interactionsService: InteractionsService
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.search({ page: 0, size: 100 }).subscribe(res => {
      if (res.success) {
        this.clients = res.data.content;
        this.filteredClients = [...this.clients];
      }
    });
  }

  filterClients() {
    const q = this.clientSearchQuery.toLowerCase();
    this.filteredClients = this.clients.filter(c => 
      c.prenom.toLowerCase().includes(q) || 
      c.nom.toLowerCase().includes(q) || 
      c.telephone.includes(q)
    );
  }

  selectClient(client: Client) {
    this.selectedClient = client;
    this.loadInteractions();
  }

  loadInteractions() {
    if (!this.selectedClient || this.selectedClient.id === undefined) return;
    this.interactionsService.listByClient(this.selectedClient.id, { page: 0, size: 50 }).subscribe(res => {
      if (res.success) {
        this.interactions = res.data.content;
      }
    });
  }

  openAddModal() {
    this.newInteraction = { type: 'APPEL', contenu: '' };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveInteraction() {
    if (!this.selectedClient || this.selectedClient.id === undefined || !this.newInteraction.contenu) return;
    
    const body = {
      clientId: this.selectedClient.id,
      type: this.newInteraction.type,
      contenu: this.newInteraction.contenu
    };

    this.interactionsService.create(body).subscribe(res => {
      if (res.success) {
        this.showAddModal = false;
        this.loadInteractions();
      }
    });
  }
}
