import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FidelisationService {
  private apiUrl = `${environment.apiUrl}/fidelisation`;

  constructor(private http: HttpClient) {}

  getByClient(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${clientId}`);
  }
}
