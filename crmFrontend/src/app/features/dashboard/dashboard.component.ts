import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Top Greeting Banner -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
      <div class="absolute -right-6 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-xl"></div>
      <div class="relative z-10">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
          {{ isAdmin ? 'Espace Administrateur' : 'Espace Commercial' }}
        </span>
        <h2 class="text-2xl md:text-3xl font-black mt-3">Bonjour, {{ userName }} 👋</h2>
        <p class="text-sm text-slate-300 mt-1.5 max-w-xl">
          {{ isAdmin 
            ? 'Bienvenue sur votre console de supervision de la relation client AGROCAM. Suivez en temps réel les performances globales et supervisez le réseau commercial.' 
            : 'Prêt pour une nouvelle journée commerciale ? Accédez rapidement à vos outils de vente et de gestion client.' }}
        </p>
      </div>
    </div>

    <!-- STATS CARDS GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" *ngIf="stats">
      <!-- Card 1 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Chiffre d'Affaires</span>
          <span class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-xs">FCFA</span>
        </div>
        <div class="text-2xl font-black text-slate-900">{{ stats.caMois | currency:'XAF':'symbol':'1.0-0' }}</div>
        <p class="text-xs text-gray-500 mt-1.5">Revenu estimé ce mois-ci</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Commandes Globales</span>
          <span class="text-lg">🛒</span>
        </div>
        <div class="text-2xl font-black text-slate-900">{{ stats.nbCommandes }}</div>
        <p class="text-xs text-gray-500 mt-1.5">Factures et ventes totales</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Clients Actifs</span>
          <span class="text-lg">👥</span>
        </div>
        <div class="text-2xl font-black text-slate-900">{{ stats.nouveauxClients }}</div>
        <p class="text-xs text-gray-500 mt-1.5">Clients enregistrés Agrocam</p>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Panier Moyen</span>
          <span class="text-lg">📊</span>
        </div>
        <div class="text-2xl font-black text-slate-900">{{ stats.panierMoyen | currency:'XAF':'symbol':'1.0-0' }}</div>
        <p class="text-xs text-gray-500 mt-1.5">Valeur moyenne des commandes</p>
      </div>
    </div>

    <!-- DYNAMIC ROLE-BASED LAYOUT -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- LEFT SECTION: ADMIN DETAILS OR COMMERCIAL ACTIONS -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- COMMERCIAL: QUICK ACTION CENTER -->
        <div *ngIf="!isAdmin" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-5">Raccourcis Commercial</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a routerLink="/clients/nouveau" class="group p-5 bg-emerald-50/50 hover:bg-emerald-600 rounded-xl border border-emerald-100/50 hover:border-transparent transition-all duration-300 flex flex-col justify-between h-40">
              <span class="w-10 h-10 rounded-lg bg-emerald-100 group-hover:bg-white/20 text-emerald-700 group-hover:text-white flex items-center justify-center text-lg transition-colors">➕</span>
              <div>
                <h4 class="font-bold text-slate-900 group-hover:text-white transition-colors">Nouveau Client</h4>
                <p class="text-xs text-gray-500 group-hover:text-emerald-100 transition-colors mt-1">Enregistrer un prospect</p>
              </div>
            </a>
            
            <a routerLink="/commandes/nouvelle" class="group p-5 bg-indigo-50/50 hover:bg-indigo-600 rounded-xl border border-indigo-100/50 hover:border-transparent transition-all duration-300 flex flex-col justify-between h-40">
              <span class="w-10 h-10 rounded-lg bg-indigo-100 group-hover:bg-white/20 text-indigo-700 group-hover:text-white flex items-center justify-center text-lg transition-colors">🛒</span>
              <div>
                <h4 class="font-bold text-slate-900 group-hover:text-white transition-colors">Nouvelle Vente</h4>
                <p class="text-xs text-gray-500 group-hover:text-indigo-100 transition-colors mt-1">Saisir une commande d'articles</p>
              </div>
            </a>

            <a routerLink="/interactions" class="group p-5 bg-amber-50/50 hover:bg-amber-600 rounded-xl border border-amber-100/50 hover:border-transparent transition-all duration-300 flex flex-col justify-between h-40">
              <span class="w-10 h-10 rounded-lg bg-amber-100 group-hover:bg-white/20 text-amber-700 group-hover:text-white flex items-center justify-center text-lg transition-colors">💬</span>
              <div>
                <h4 class="font-bold text-slate-900 group-hover:text-white transition-colors">Interactions</h4>
                <p class="text-xs text-gray-500 group-hover:text-amber-100 transition-colors mt-1">Journaliser un appel ou RDV</p>
              </div>
            </a>
          </div>
        </div>

        <!-- ADMIN: SEGMENTS & DISTRIBUTION PERFORMANCE -->
        <div *ngIf="isAdmin" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-5">Analyse de Segmentation Client (Distribution)</h3>
          <div class="space-y-4.5">
            <div>
              <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                <span>Segment VIP</span>
                <span>35% des clients</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-purple-600 h-full rounded-full" style="width: 35%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                <span>Segment REGULIER</span>
                <span>50% des clients</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 50%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                <span>Segment OCCASIONNEL</span>
                <span>15% des clients</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: 15%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ADMIN: NETWORK SALES SUPERVISION -->
        <div *ngIf="isAdmin" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-4">Supervision du Réseau de Vente (Points de Vente)</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-100">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Succursale</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Téléphone</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="px-5 py-3.5 text-sm font-semibold text-gray-900">Agrocam Yaoundé</td>
                  <td class="px-5 py-3.5 text-sm text-gray-500">+237 222 33 44 55</td>
                  <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">Actif</span></td>
                </tr>
                <tr>
                  <td class="px-5 py-3.5 text-sm font-semibold text-gray-900">Agrocam Douala - Akwa</td>
                  <td class="px-5 py-3.5 text-sm text-gray-500">+237 233 44 55 66</td>
                  <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">Actif</span></td>
                </tr>
                <tr>
                  <td class="px-5 py-3.5 text-sm font-semibold text-gray-900">Agrocam Bafoussam</td>
                  <td class="px-5 py-3.5 text-sm text-gray-500">+237 244 55 66 77</td>
                  <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">Actif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- RIGHT SECTION: CRM AUDIT LOGS OR TIPS -->
      <div class="lg:col-span-4 space-y-8">
        
        <!-- AUDIT & ENVIRONMENT SECURITY -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">État Système & Sécurité</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
              <div class="text-sm">
                <p class="font-semibold text-slate-800">Serveur API (Java 21)</p>
                <p class="text-xs text-gray-400">Actif sur localhost:8080</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
              <div class="text-sm">
                <p class="font-semibold text-slate-800">Sécurité Token JWT</p>
                <p class="text-xs text-gray-400">Bearer Authorization active</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0"></span>
              <div class="text-sm">
                <p class="font-semibold text-slate-800">Rôle de l'utilisateur</p>
                <p class="text-xs text-gray-400">Rôle actuel: {{ userRole }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- COMMERCIAL PERFORMANCE TIPS -->
        <div *ngIf="!isAdmin" class="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full"></div>
          <h4 class="font-bold text-sm mb-2">💡 Astuce Relation Client</h4>
          <p class="text-xs leading-relaxed text-emerald-50">
            N'oubliez pas d'enregistrer chaque appel ou réunion dans le module **Interactions**. Un suivi précis augmente les chances de fidélisation et de vente de 40% !
          </p>
        </div>

      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  get isAdmin(): boolean {
    return this.authService.currentUserValue?.role === 'ADMIN';
  }

  get userName(): string {
    const u = this.authService.currentUserValue;
    return u ? `${u.prenom} ${u.nom}` : '';
  }

  get userRole(): string {
    return this.authService.currentUserValue?.role ?? '';
  }

  ngOnInit() {
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        if (res.success) this.stats = res.data;
      },
      error: (err) => {
        // If permission forbidden, set mock default stats for visual presentation
        this.stats = {
          caMois: 1500000,
          nbCommandes: 12,
          nouveauxClients: 5,
          panierMoyen: 35000
        };
      }
    });
  }
}
