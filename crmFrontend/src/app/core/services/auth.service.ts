import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  token: string;
  type: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private http: HttpClient) {
    if (this.isBrowser) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        try {
          this.currentUserSubject.next(JSON.parse(saved));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
    }
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        if (res.success && res.data && res.data.token) {
          if (this.isBrowser) {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
          }
          this.currentUserSubject.next(res.data);
        }
      })
    );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}
