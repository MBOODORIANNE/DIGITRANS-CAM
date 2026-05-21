import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommandesService } from '../../../core/services/commandes.service';
import { ClientsService } from '../../../core/services/clients.service';
import { RestaurantsService } from '../../../core/services/restaurants.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="md:flex md:items-center md:justify-between mb-8">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Nouvelle commande
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Enregistrez une nouvelle vente Agrocam avec des articles multiples.
          </p>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <form [formGroup]="commandeForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
          <div *ngIf="errorMessage" class="p-4 bg-red-50 text-red-700 text-sm rounded-md">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- Client Selection -->
            <div class="sm:col-span-3">
              <label for="clientId" class="block text-sm font-medium text-gray-700">Client Agrocam</label>
              <select id="clientId" formControlName="clientId"
                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                <option value="">Sélectionner un client...</option>
                <option *ngFor="let c of clients" [value]="c.id">{{ c.prenom }} {{ c.nom }} ({{ c.telephone }})</option>
              </select>
              <span *ngIf="commandeForm.get('clientId')?.touched && commandeForm.get('clientId')?.invalid" class="text-xs text-red-600">Le client est requis.</span>
            </div>

            <!-- Restaurant/POS Selection -->
            <div class="sm:col-span-3">
              <label for="restaurantId" class="block text-sm font-medium text-gray-700">Point de Vente (Restaurant)</label>
              <select id="restaurantId" formControlName="restaurantId"
                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                <option value="">Sélectionner un point de vente...</option>
                <option *ngFor="let r of restaurants" [value]="r.id">{{ r.nom }} - {{ r.adresse }}</option>
              </select>
              <span *ngIf="commandeForm.get('restaurantId')?.touched && commandeForm.get('restaurantId')?.invalid" class="text-xs text-red-600">Le point de vente est requis.</span>
            </div>
          </div>

          <!-- Lignes de Commande (FormArray) -->
          <div class="mt-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Articles / Produits commandés</h3>
              <button type="button" (click)="addLigne()"
                class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none transition-all">
                <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Ajouter un article
              </button>
            </div>

            <div class="border-t border-gray-200 divide-y divide-gray-150">
              <div formArrayName="lignes" *ngFor="let item of lignes.controls; let i=index" [formGroupName]="i" class="py-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-12 items-end">
                <div class="sm:col-span-5">
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Nom du produit / Description</label>
                  <input type="text" formControlName="produitNom" placeholder="Ex: Poulet rôti Agrocam"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Quantité</label>
                  <input type="number" formControlName="quantite" (input)="calculateTotal()"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                </div>

                <div class="sm:col-span-3">
                  <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Prix Unitaire (FCFA)</label>
                  <input type="number" formControlName="prixUnitaire" (input)="calculateTotal()"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                </div>

                <div class="sm:col-span-2 text-right">
                  <button type="button" (click)="removeLigne(i)" [disabled]="lignes.length <= 1"
                    class="inline-flex items-center justify-center p-2 rounded-md border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 disabled:opacity-30 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Total display -->
          <div class="flex justify-between items-center bg-gray-50 rounded-xl p-6 border border-gray-100">
            <span class="text-base font-semibold text-gray-700">Montant Total Estimé</span>
            <span class="text-2xl font-bold text-slate-900">{{ totalMontant | currency:'XAF':'symbol':'1.0-0' }}</span>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <a routerLink="/commandes"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-all">
              Annuler
            </a>
            <button type="submit" [disabled]="commandeForm.invalid || saving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none transition-all disabled:opacity-50">
              {{ saving ? 'Enregistrement...' : 'Valider la commande' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CommandeFormComponent implements OnInit {
  commandeForm: FormGroup;
  clients: Client[] = [];
  restaurants: any[] = [];
  saving = false;
  errorMessage = '';
  totalMontant = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commandesService: CommandesService,
    private clientsService: ClientsService,
    private restaurantsService: RestaurantsService
  ) {
    this.commandeForm = this.fb.group({
      clientId: ['', Validators.required],
      restaurantId: ['', Validators.required],
      lignes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Load clients for dropdown
    this.clientsService.search({ page: 0, size: 100 }).subscribe(res => {
      if (res.success) this.clients = res.data.content;
    });

    // Load restaurants for dropdown
    this.restaurantsService.list({ page: 0, size: 100 }).subscribe(res => {
      if (res.success) this.restaurants = res.data.content;
    });

    // Add first empty item line
    this.addLigne();
  }

  get lignes(): FormArray {
    return this.commandeForm.get('lignes') as FormArray;
  }

  addLigne(): void {
    const ligneGroup = this.fb.group({
      produitNom: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]]
    });
    this.lignes.push(ligneGroup);
    this.calculateTotal();
  }

  removeLigne(index: number): void {
    if (this.lignes.length > 1) {
      this.lignes.removeAt(index);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    let total = 0;
    this.lignes.controls.forEach(control => {
      const q = control.get('quantite')?.value || 0;
      const p = control.get('prixUnitaire')?.value || 0;
      total += q * p;
    });
    this.totalMontant = total;
  }

  onSubmit(): void {
    if (this.commandeForm.invalid) return;
    this.saving = true;
    this.errorMessage = '';

    const req = this.commandeForm.value;
    req.clientId = +req.clientId;
    req.restaurantId = +req.restaurantId;

    this.commandesService.create(req).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/commandes']);
        } else {
          this.errorMessage = res.message || "Une erreur est survenue lors de l'enregistrement de la commande.";
          this.saving = false;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Une erreur est survenue lors de l'enregistrement de la commande.";
        this.saving = false;
      }
    });
  }
}
