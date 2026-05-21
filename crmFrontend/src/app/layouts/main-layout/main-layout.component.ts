import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-gray-50 font-sans">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-xl">
        <!-- Logo -->
        <div class="p-6 border-b border-slate-700/50">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-lg">D</div>
            <div>
              <p class="text-sm font-bold tracking-wide">DIGITRANS-CM</p>
              <p class="text-xs text-slate-400">CRM Agrocam</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Principal</p>
          
          <a routerLink="/dashboard" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l6-4 6 4 6-4v13l-6 4-6-4-6 4V7z"/></svg>
            Dashboard
          </a>

          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-4">Gestion</p>
          
          <a routerLink="/clients" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            Clients
          </a>

          <a routerLink="/commandes" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Commandes
          </a>

          <a routerLink="/restaurants" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            Restaurants
          </a>

          <a routerLink="/interactions" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            Interactions
          </a>

          <a routerLink="/fidelisation" routerLinkActive="bg-emerald-600/20 text-emerald-400 border-l-2 border-emerald-400"
             class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
            Fidélisation
          </a>
        </nav>

        <!-- User / Logout -->
        <div class="p-4 border-t border-slate-700/50">
          <div class="flex items-center gap-3 mb-3 px-2">
            <div class="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-semibold">
              {{ userInitial }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-white truncate">{{ userName }}</p>
              <p class="text-xs text-slate-500 truncate">{{ userRole }}</p>
            </div>
          </div>
          <button (click)="logout()" class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Top bar -->
        <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 class="text-lg font-semibold text-gray-800">CRM AGROCAM</h1>
            <p class="text-xs text-gray-500">Système de Gestion de la Relation Client</p>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Système opérationnel</span>
          </div>
        </header>

        <!-- Page content -->
        <div class="flex-1 overflow-auto p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class MainLayoutComponent {
  get userInitial(): string {
    const u = this.auth.currentUserValue;
    return u ? (u.prenom?.[0] ?? u.email[0]).toUpperCase() : '?';
  }
  get userName(): string {
    const u = this.auth.currentUserValue;
    return u ? `${u.prenom} ${u.nom}` : '';
  }
  get userRole(): string {
    return this.auth.currentUserValue?.role ?? '';
  }

  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
