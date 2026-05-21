import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../../core/services/clients.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="mt-1 text-sm text-gray-500">Liste des clients enregistrés dans Agrocam avec filtres avancés.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <a routerLink="/clients/nouveau"
          class="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Ajouter un client
        </a>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Rechercher</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" [(ngModel)]="searchQuery" (input)="onFilterChange()"
            placeholder="Nom, prénom, email ou téléphone..."
            class="pl-10 block w-full border border-gray-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
        </div>
      </div>
      
      <div class="w-full md:w-48">
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Segment</label>
        <select [(ngModel)]="selectedSegment" (change)="onFilterChange()"
          class="block w-full bg-white border border-gray-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          <option value="">Tous les segments</option>
          <option value="REGULIER">Régulier</option>
          <option value="VIP">VIP</option>
          <option value="OCCASIONNEL">Occasionnel</option>
        </select>
      </div>

      <div class="w-full md:w-48">
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ville</label>
        <input type="text" [(ngModel)]="selectedVille" (input)="onFilterChange()"
          placeholder="Ex: Douala"
          class="block w-full border border-gray-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ville</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Segment</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Inscription</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr *ngFor="let client of clients" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4.5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    {{ client.prenom[0] }}{{ client.nom[0] }}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ client.prenom }} {{ client.nom }}</div>
                    <div class="text-xs text-gray-500">ID: #{{ client.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap">
                <div class="text-sm text-gray-700 font-medium">{{ client.telephone }}</div>
                <div class="text-xs text-gray-400">{{ client.email || 'Pas d\\'email' }}</div>
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap text-sm text-gray-500 font-medium">
                {{ client.ville }}
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap">
                <span [ngClass]="{
                  'bg-purple-50 text-purple-700 border-purple-100': client.segment === 'VIP',
                  'bg-emerald-50 text-emerald-700 border-emerald-100': client.segment === 'REGULIER',
                  'bg-amber-50 text-amber-700 border-amber-100': client.segment === 'OCCASIONNEL'
                }" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border">
                  {{ client.segment }}
                </span>
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap text-sm text-gray-500">
                {{ client.dateInscription | date:'dd/MM/yyyy' }}
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-3">
                  <a [routerLink]="['/clients', client.id, 'modifier']"
                    class="text-slate-500 hover:text-emerald-600 transition-colors p-1" title="Modifier">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </a>
                  <button *ngIf="client.id !== undefined" (click)="onDelete(client.id)" class="text-slate-500 hover:text-red-600 transition-colors p-1" title="Supprimer">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination / No Data -->
      <div *ngIf="clients.length === 0" class="p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <h3 class="mt-2 text-sm font-semibold text-gray-900">Aucun client trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres ou créez un nouveau client.</p>
        <div class="mt-6">
          <a routerLink="/clients/nouveau"
            class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
            Créer un client
          </a>
        </div>
      </div>
    </div>
  `
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  searchQuery = '';
  selectedSegment = '';
  selectedVille = '';
  
  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    const params: any = { page: 0, size: 50 };
    if (this.searchQuery) params.q = this.searchQuery;
    if (this.selectedSegment) params.segment = this.selectedSegment;
    if (this.selectedVille) params.ville = this.selectedVille;

    this.clientsService.search(params).subscribe(res => {
      if (res.success) {
        this.clients = res.data.content;
      }
    });
  }

  onFilterChange() {
    this.loadClients();
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientsService.delete(id).subscribe(() => {
        this.loadClients();
      });
    }
  }
}
