import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Commande } from '../models/commande.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class CommandesService {
  private apiUrl = `${environment.apiUrl}/commandes`;

  constructor(private http: HttpClient) {}

  list(params: any): Observable<ApiResponse<any>> {
    let httpParams = new HttpParams();
    if (params.statut) httpParams = httpParams.set('statut', params.statut);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<ApiResponse<any>>(this.apiUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<Commande>> {
    return this.http.get<ApiResponse<Commande>>(`${this.apiUrl}/${id}`);
  }

  create(commande: Commande): Observable<ApiResponse<Commande>> {
    return this.http.post<ApiResponse<Commande>>(this.apiUrl, commande);
  }
}
