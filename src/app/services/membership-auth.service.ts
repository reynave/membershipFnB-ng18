import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface MemberProfile {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class MembershipAuthService {
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ping(): Observable<any> {
    return this.http.get<any>(`${this.membershipBaseUrl}/ping`);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.membershipBaseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post<any>(`${this.membershipBaseUrl}/auth/register`, payload);
  }
}