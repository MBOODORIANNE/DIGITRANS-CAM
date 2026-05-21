import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InteractionsService {
  private apiUrl = `${environment.apiUrl}/interactions`;

  constructor(private http: HttpClient) {}

  listByClient(clientId: number, params: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<any>(`${this.apiUrl}/client/${clientId}`, { params: httpParams });
  }

  create(interaction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, interaction);
  }
}
