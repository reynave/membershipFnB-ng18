import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MembershipPointService {
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  getBalance(): Observable<any> {
    return this.http.get<any>(`${this.membershipBaseUrl}/points/balance`);
  }

  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.membershipBaseUrl}/points/history`);
  }

  getPromos(): Observable<any> {
    return this.http.get<any>(`${this.membershipBaseUrl}/promos`);
  }

  getPromo(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.membershipBaseUrl}/promos/${id}`);
  }
}