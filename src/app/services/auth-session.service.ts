import { Injectable } from '@angular/core';

import { MemberProfile } from './membership-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly tokenStorageKey = 'membership_token';
  private readonly memberStorageKey = 'membership_member';

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  persistSession(token: string, member: MemberProfile): void {
    localStorage.setItem(this.tokenStorageKey, token);
    localStorage.setItem(this.memberStorageKey, JSON.stringify(member));
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.memberStorageKey);
  }
}