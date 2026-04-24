import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';

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

  private readonly membershipPointService = inject(MembershipPointService);

  ngOnInit(): void {
    this.loadPointBalance();
    this.loadPromos();
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
