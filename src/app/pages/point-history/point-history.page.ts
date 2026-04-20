import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { MembershipPointService } from '../../services/membership-point.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-point-history-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './point-history.page.html',
})
export class PointHistoryPage implements OnInit {
  protected historyItems: any[] = [];
  protected isLoading = true;
  protected errorMessage = '';
  protected balancePoint = 0;
  protected thisMonthDelta = 0;
  public environment = environment;
  private readonly membershipPointService = inject(MembershipPointService);

  ngOnInit(): void {
    this.loadPointHistory();
  }

  protected formatNumber(value: number): string {
    return Number(value || 0).toLocaleString('en-US');
  }

  protected formatPointDelta(value: number): string {
    const normalizedValue = Number(value || 0);
    const prefix = normalizedValue >= 0 ? '+' : '-';

    return `${prefix}${this.formatNumber(Math.abs(normalizedValue))}`;
  }

  protected resolveDelta(item: any): number {
    return Number(item?.pointIn || 0) - Number(item?.pointOut || 0);
  }

  protected isPointIn(item: any): boolean {
    return this.resolveDelta(item) >= 0;
  }

  protected formatDate(value: string): string {
    const dateValue = new Date(value);

    if (Number.isNaN(dateValue.getTime())) {
      return '-';
    }

    return dateValue.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private loadPointHistory(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.membershipPointService.getHistory().subscribe({
      next: (response) => {
        const rows = Array.isArray(response?.data) ? response.data : [];

        this.historyItems = rows;
        this.computeStats(rows);
        this.isLoading = false;
      },
      error: () => {
        this.historyItems = [];
        this.balancePoint = 0;
        this.thisMonthDelta = 0;
        this.errorMessage = 'Failed to load point history';
        this.isLoading = false;
      }
    });
  }

  private computeStats(rows: any[]): void {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let totalDelta = 0;
    let monthDelta = 0;

    rows.forEach((item) => {
      const delta = this.resolveDelta(item);
      totalDelta += delta;

      const dateValue = new Date(item?.transactionDate);
      if (!Number.isNaN(dateValue.getTime()) && dateValue.getMonth() === currentMonth && dateValue.getFullYear() === currentYear) {
        monthDelta += delta;
      }
    });

    this.balancePoint = totalDelta;
    this.thisMonthDelta = monthDelta;
  }
}
