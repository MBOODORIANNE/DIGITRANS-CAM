import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-fidelisation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Programme de Fidélité Agrocam</h1>
        <p class="mt-1 text-sm text-gray-500">Suivi des points et statuts des clients membres du club privilège.</p>
      </div>
    </div>

    <!-- Search / Client grid selection -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 flex flex-col md:flex-row gap-4 items-center">
      <div class="flex-1 w-full">
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Rechercher un client adhérent</label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input type="text" [(ngModel)]="searchQuery" (input)="filterClients()"
            placeholder="Rechercher par nom, prénom, téléphone..."
            class="pl-10 block w-full border border-gray-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
        </div>
      </div>
    </div>

    <!-- Fidelity cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div *ngFor="let card of loyaltyCards" class="relative bg-gradient-to-br overflow-hidden rounded-2xl shadow-md border p-6 flex flex-col justify-between h-56 transition-all duration-300 hover:shadow-lg"
        [ngClass]="{
          'from-slate-800 to-slate-900 text-white border-slate-700': card.niveau === 'PLATINE',
          'from-amber-500 to-amber-600 text-white border-amber-400': card.niveau === 'OR',
          'from-slate-300 to-slate-400 text-slate-800 border-slate-200': card.niveau === 'ARGENT',
          'from-orange-700 to-orange-800 text-white border-orange-600': card.niveau === 'BRONZE'
        }">
        
        <!-- Abstract shape design -->
        <div class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white">
              {{ card.niveau }} MEMBER
            </span>
            <span class="text-xl font-bold">★</span>
          </div>
          
          <h3 class="text-lg font-bold truncate">{{ card.clientName }}</h3>
          <p class="text-xs opacity-75 mt-0.5">{{ card.clientPhone }}</p>
        </div>

        <div>
          <div class="flex items-end justify-between">
            <div>
              <div class="text-[10px] uppercase font-bold tracking-wider opacity-75">Solde des points</div>
              <div class="text-2xl font-black mt-0.5">{{ card.points }} <span class="text-xs font-semibold">pts</span></div>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold tracking-wider bg-white/10 px-2 py-1 rounded-lg">Agrocam Club</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div *ngIf="loyaltyCards.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center mt-6">
      <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">Aucune carte privilège</h3>
      <p class="mt-1 text-sm text-gray-500">Commencez par ajouter ou rechercher des clients pour voir leur carte de fidélité.</p>
    </div>
  `
})
export class FidelisationListComponent implements OnInit {
  clients: Client[] = [];
  loyaltyCards: any[] = [];
  searchQuery = '';

  constructor(private clientsService: ClientsService, private http: HttpClient) {}

  ngOnInit() {
    this.loadClientsAndCards();
  }

  loadClientsAndCards() {
    this.clientsService.search({ page: 0, size: 50 }).subscribe(res => {
      if (res.success) {
        this.clients = res.data.content;
        this.loyaltyCards = [];
        this.clients.forEach(c => {
          this.http.get<any>(`${environment.apiUrl}/fidelisation/client/${c.id}`).subscribe(resFid => {
            if (resFid.success) {
              this.loyaltyCards.push({
                clientId: c.id,
                clientName: `${c.prenom} ${c.nom}`,
                clientPhone: c.telephone,
                points: resFid.data.points,
                niveau: resFid.data.niveau
              });
            }
          });
        });
      }
    });
  }

  filterClients() {
    if (!this.searchQuery) {
      this.loadClientsAndCards();
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.loyaltyCards = this.loyaltyCards.filter(card =>
      card.clientName.toLowerCase().includes(q) ||
      card.clientPhone.includes(q)
    );
  }
}
