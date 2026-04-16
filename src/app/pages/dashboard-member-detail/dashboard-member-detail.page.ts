import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { MembershipPointService } from '../../services/membership-point.service';

@Component({
  selector: 'app-dashboard-member-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-member-detail.page.html',
})
export class DashboardMemberDetailPage implements OnInit {
  protected readonly pointBalance = signal<number | null>(null);
  protected readonly isLoadingPointBalance = signal(true);
  protected readonly pointBalanceError = signal('');

  private readonly membershipPointService = inject(MembershipPointService);

  ngOnInit(): void {
    this.loadPointBalance();
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
}
