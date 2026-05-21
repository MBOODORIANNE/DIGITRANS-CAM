import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommandesService } from '../../../core/services/commandes.service';
import { Commande } from '../../../core/models/commande.model';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Commandes</h1>
        <p class="mt-1 text-sm text-gray-500">Liste des ventes, factures et commandes Agrocam enregistrées.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <a routerLink="/commandes/nouvelle"
          class="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Nouvelle commande
        </a>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Filtrer par statut</label>
        <div class="flex gap-2">
          <button (click)="selectStatus('')" [ngClass]="selectedStatus === '' ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
            class="px-4 py-2 text-sm font-semibold rounded-lg border transition-all">
            Toutes
          </button>
          <button (click)="selectStatus('EN_COURS')" [ngClass]="selectedStatus === 'EN_COURS' ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
            class="px-4 py-2 text-sm font-semibold rounded-lg border transition-all">
            En Cours
          </button>
          <button (click)="selectStatus('LIVREE')" [ngClass]="selectedStatus === 'LIVREE' ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
            class="px-4 py-2 text-sm font-semibold rounded-lg border transition-all">
            Livrées
          </button>
          <button (click)="selectStatus('ANNULEE')" [ngClass]="selectedStatus === 'ANNULEE' ? 'bg-emerald-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
            class="px-4 py-2 text-sm font-semibold rounded-lg border transition-all">
            Annulées
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Référence</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Commande</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Montant Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr *ngFor="let cmd of commandes" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4.5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                    CMD
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ cmd.reference }}</div>
                    <div class="text-xs text-gray-400">ID: #{{ cmd.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap text-sm text-gray-500">
                {{ cmd.dateCommande | date:'dd/MM/yyyy HH:mm' }}
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap">
                <span [ngClass]="{
                  'bg-amber-50 text-amber-700 border-amber-100': cmd.statut === 'EN_COURS',
                  'bg-emerald-50 text-emerald-700 border-emerald-100': cmd.statut === 'LIVREE',
                  'bg-red-50 text-red-700 border-red-100': cmd.statut === 'ANNULEE'
                }" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border">
                  {{ cmd.statut }}
                </span>
              </td>
              <td class="px-6 py-4.5 whitespace-nowrap text-right text-sm font-bold text-slate-900">
                {{ cmd.montantTotal | currency:'XAF':'symbol':'1.0-0' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Data -->
      <div *ngIf="commandes.length === 0" class="p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        <h3 class="mt-2 text-sm font-semibold text-gray-900">Aucune commande trouvée</h3>
        <p class="mt-1 text-sm text-gray-500">Aucune vente correspondante à vos critères d'affichage.</p>
        <div class="mt-6">
          <a routerLink="/commandes/nouvelle"
            class="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
            Créer une commande
          </a>
        </div>
      </div>
    </div>
  `
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  selectedStatus = '';
  
  constructor(private commandesService: CommandesService) {}

  ngOnInit() {
    this.loadCommandes();
  }

  loadCommandes() {
    const params: any = { page: 0, size: 50 };
    if (this.selectedStatus) params.statut = this.selectedStatus;

    this.commandesService.list(params).subscribe(res => {
      if (res.success) {
        this.commandes = res.data.content;
      }
    });
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.loadCommandes();
  }
}
