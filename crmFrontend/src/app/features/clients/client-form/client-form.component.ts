import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientsService } from '../../../core/services/clients.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto">
      <div class="md:flex md:items-center md:justify-between mb-8">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {{ isEditMode ? 'Modifier le client' : 'Nouveau client' }}
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            {{ isEditMode ? 'Modifiez les informations du client Agrocam ci-dessous.' : 'Enregistrez un nouveau client pour Agrocam.' }}
          </p>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
          <div *ngIf="errorMessage" class="p-4 bg-red-50 text-red-700 text-sm rounded-md">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
              <input type="text" id="prenom" formControlName="prenom"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span *ngIf="clientForm.get('prenom')?.touched && clientForm.get('prenom')?.invalid" class="text-xs text-red-600">Le prénom est requis.</span>
            </div>

            <div class="sm:col-span-3">
              <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" id="nom" formControlName="nom"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span *ngIf="clientForm.get('nom')?.touched && clientForm.get('nom')?.invalid" class="text-xs text-red-600">Le nom est requis.</span>
            </div>

            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" formControlName="email"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span *ngIf="clientForm.get('email')?.touched && clientForm.get('email')?.invalid" class="text-xs text-red-600">L'email doit être valide.</span>
            </div>

            <div class="sm:col-span-3">
              <label for="telephone" class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="text" id="telephone" formControlName="telephone" placeholder="+2376XXXXXXXX"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span class="text-xs text-gray-400 mt-1 block font-medium">Format requis : +237 suivi de 9 chiffres (ex: +237699887766)</span>
              <span *ngIf="clientForm.get('telephone')?.touched && clientForm.get('telephone')?.invalid" class="text-xs text-red-600 block mt-0.5">Le numéro de téléphone est obligatoire et doit commencer par +237 suivi de 9 chiffres.</span>
            </div>

            <div class="sm:col-span-3">
              <label for="ville" class="block text-sm font-medium text-gray-700">Ville</label>
              <input type="text" id="ville" formControlName="ville"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
              <span *ngIf="clientForm.get('ville')?.touched && clientForm.get('ville')?.invalid" class="text-xs text-red-600">La ville est requise.</span>
            </div>

            <div class="sm:col-span-3">
              <label for="segment" class="block text-sm font-medium text-gray-700">Segment</label>
              <select id="segment" formControlName="segment"
                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                <option value="REGULIER">Régulier</option>
                <option value="VIP">VIP</option>
                <option value="OCCASIONNEL">Occasionnel</option>
              </select>
            </div>

            <div class="sm:col-span-6">
              <label for="adresse" class="block text-sm font-medium text-gray-700">Adresse</label>
              <textarea id="adresse" formControlName="adresse" rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <a routerLink="/clients"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              Annuler
            </a>
            <button type="submit" [disabled]="clientForm.invalid || saving"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50">
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId?: number;
  saving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService
  ) {
    this.clientForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+237[0-9]{9}$/)]],
      ville: ['', Validators.required],
      adresse: [''],
      segment: ['REGULIER', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.clientId = +idParam;
      this.clientsService.getById(this.clientId).subscribe({
        next: (res) => {
          if (res.success) {
            this.clientForm.patchValue(res.data);
          }
        },
        error: (err) => {
          this.errorMessage = 'Impossible de charger les données du client.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.invalid) return;
    this.saving = true;
    this.errorMessage = '';

    const clientData: Client = this.clientForm.value;

    const request$ = this.isEditMode && this.clientId
      ? this.clientsService.update(this.clientId, clientData)
      : this.clientsService.create(clientData);

    request$.subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/clients']);
        } else {
          this.errorMessage = res.message || "Une erreur est survenue lors de l'enregistrement.";
          this.saving = false;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Une erreur est survenue lors de l'enregistrement.";
        this.saving = false;
      }
    });
  }
}
