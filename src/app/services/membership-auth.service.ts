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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface MembershipPingResponse {
  success: boolean;
  source: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface LoginResult {
  token: string;
  member: MemberProfile;
}

@Injectable({ providedIn: 'root' })
export class MembershipAuthService {
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ping(): Observable<MembershipPingResponse> {
    return this.http.get<MembershipPingResponse>(`${this.membershipBaseUrl}/ping`);
  }

  login(payload: LoginPayload): Observable<ApiResponse<LoginResult>> {
    return this.http.post<ApiResponse<LoginResult>>(`${this.membershipBaseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<ApiResponse<MemberProfile>> {
    return this.http.post<ApiResponse<MemberProfile>>(`${this.membershipBaseUrl}/auth/register`, payload);
  }
}