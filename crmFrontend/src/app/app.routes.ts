import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'clients', loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent) },
      { path: 'clients/nouveau', loadComponent: () => import('./features/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clients/:id/modifier', loadComponent: () => import('./features/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'commandes', loadComponent: () => import('./features/commandes/commande-list/commande-list.component').then(m => m.CommandeListComponent) },
      { path: 'commandes/nouvelle', loadComponent: () => import('./features/commandes/commande-form/commande-form.component').then(m => m.CommandeFormComponent) },
      { path: 'restaurants', loadComponent: () => import('./features/restaurants/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent) },
      { path: 'interactions', loadComponent: () => import('./features/interactions/interaction-list/interaction-list.component').then(m => m.InteractionListComponent) },
      { path: 'fidelisation', loadComponent: () => import('./features/fidelisation/fidelisation-list/fidelisation-list.component').then(m => m.FidelisationListComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/auth/login' }
];
