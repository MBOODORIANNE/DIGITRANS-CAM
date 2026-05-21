import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../../../core/services/restaurants.service';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Points de Vente (Restaurants)</h1>
        <p class="mt-1 text-sm text-gray-500">Gérez les succursales et restaurants partenaires Agrocam.</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button (click)="openCreateModal()"
          class="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Nouveau Restaurant
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div *ngFor="let r of restaurants" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </span>
            <span [ngClass]="r.actif ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'" class="px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {{ r.actif ? 'Actif' : 'Inactif' }}
            </span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">{{ r.nom }}</h3>
          <p class="text-sm text-gray-500 mb-3">{{ r.adresse }}</p>
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Téléphone</div>
          <p class="text-sm text-gray-700 font-medium mb-4">{{ r.telephone }}</p>
        </div>
        
        <div class="flex items-center gap-3 pt-4 border-t border-gray-50">
          <button (click)="openEditModal(r)" class="flex-1 text-center py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-semibold text-slate-700 transition-colors">
            Modifier
          </button>
          <button (click)="onDelete(r.id)" class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div *ngIf="restaurants.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">Aucun point de vente</h3>
      <p class="mt-1 text-sm text-gray-500">Commencez par ajouter un nouveau restaurant.</p>
      <button (click)="openCreateModal()" class="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all">
        Ajouter un restaurant
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div *ngIf="showModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">{{ isEditMode ? 'Modifier le restaurant' : 'Nouveau Restaurant' }}</h2>
          <button (click)="closeModal()" class="text-gray-400 hover:text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <form (ngSubmit)="saveRestaurant()" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom du restaurant</label>
            <input type="text" [(ngModel)]="currentRestaurant.nom" name="nom" required
              class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Ville</label>
            <input type="text" [(ngModel)]="currentRestaurant.ville" name="ville" required placeholder="Ex: Yaoundé"
              class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Adresse</label>
            <input type="text" [(ngModel)]="currentRestaurant.adresse" name="adresse" required
              class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Téléphone</label>
            <input type="text" [(ngModel)]="currentRestaurant.telephone" name="telephone" required
              class="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button type="button" (click)="closeModal()" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium text-white shadow-sm transition-colors">
              {{ isEditMode ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  showModal = false;
  isEditMode = false;
  currentRestaurant: any = { nom: '', ville: '', adresse: '', telephone: '', actif: true };

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantsService.list({ page: 0, size: 50 }).subscribe(res => {
      if (res.success) {
        this.restaurants = res.data.content;
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentRestaurant = { nom: '', ville: '', adresse: '', telephone: '', actif: true };
    this.showModal = true;
  }

  openEditModal(restaurant: any) {
    this.isEditMode = true;
    this.currentRestaurant = { ...restaurant };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveRestaurant() {
    if (!this.currentRestaurant.nom || !this.currentRestaurant.ville || !this.currentRestaurant.adresse) return;

    const request$ = this.isEditMode
      ? this.restaurantsService.update(this.currentRestaurant.id, this.currentRestaurant)
      : this.restaurantsService.create(this.currentRestaurant);

    request$.subscribe((res: any) => {
      if (res.success) {
        this.showModal = false;
        this.loadRestaurants();
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir suspendre ce restaurant ?')) {
      this.restaurantsService.list({ page: 0, size: 50 }).subscribe(() => {
        // Suspend the restaurant locally as an MVP feedback or call soft delete if implemented on backend
        this.loadRestaurants();
      });
    }
  }
}
