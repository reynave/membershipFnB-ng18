import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { MembershipPointService } from '../../services/membership-point.service';

@Component({
  selector: 'app-dashboard-member-detail-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './dashboard-member-detail.page.html',
})
export class DashboardMemberDetailPage implements OnInit {
  protected readonly pointBalance = signal<number | null>(null);
  protected readonly isLoadingPointBalance = signal(true);
  protected readonly pointBalanceError = signal('');
  protected readonly promos = signal<any[]>([]);
  protected readonly isLoadingPromos = signal(false);
  protected readonly promosError = signal('');
  protected readonly voucherReminders = signal<any[]>([]);
  protected readonly isLoadingVoucherReminders = signal(false);
  protected readonly voucherRemindersError = signal('');

  private readonly membershipPointService = inject(MembershipPointService);
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ngOnInit(): void {
    this.loadPointBalance();
    this.loadPromos();
    this.loadVoucherReminders();
  }

  private loadVoucherReminders(): void {
    this.isLoadingVoucherReminders.set(true);
    this.voucherRemindersError.set('');

    this.http.get<any>(`${this.membershipBaseUrl}/members-voucher`).subscribe({
      next: (res: any) => {
        this.voucherReminders.set(res.data?.rows || []);
        this.isLoadingVoucherReminders.set(false);
      },
      error: (_err: any) => {
        this.voucherReminders.set([]);
        this.voucherRemindersError.set('Failed to load vouchers');
        this.isLoadingVoucherReminders.set(false);
      }
    });
  }
  private loadPointBalance(): void {
    this.isLoadingPointBalance.set(true);
    this.pointBalanceError.set('');

    this.membershipPointService.getBalance().subscribe({
      next: (response) => {
        this.pointBalance.set(response.data.balancePoint);
        this.isLoadingPointBalance.set(false);
      },
      error: () => {
        this.pointBalance.set(null);
        this.pointBalanceError.set('Point unavailable');
        this.isLoadingPointBalance.set(false);
      },
    });
  }

  private loadPromos(): void {
    this.isLoadingPromos.set(true);
    this.promosError.set('');

    this.membershipPointService.getPromos().subscribe({
      next: (response) => {
        this.promos.set(response.data?.rows || []);
        this.isLoadingPromos.set(false);
      },
      error: () => {
        this.promos.set([]);
        this.promosError.set('Failed to load promos');
        this.isLoadingPromos.set(false);
      }
    });
  }
  truncateDescription(text: any, maxChars = 120): string {
    if (!text) return '';
    const str = String(text).trim();

    if (str.length <= maxChars) return str;

    return str.slice(0, maxChars) + '...';
  }
}
