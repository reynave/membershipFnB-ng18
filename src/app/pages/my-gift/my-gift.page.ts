import { CommonModule, Location, NgFor } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-gift-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './my-gift.page.html',
})
export class MyGiftPage implements OnInit {
  private readonly location = inject(Location);
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  activeTab: 'active' | 'history' = 'active';

  protected readonly voucherReminders = signal<any[]>([]);
  protected readonly isLoadingVoucherReminders = signal(false);
  protected readonly voucherRemindersError = signal('');
  protected readonly voucherHistory = signal<any[]>([]);
  protected readonly isLoadingVoucherHistory = signal(false);
  protected readonly voucherHistoryError = signal('');

  ngOnInit(): void {
    if (this.activeTab === 'active') this.loadVoucherReminders();
  }

  goBack(): void {
    this.location.back();
  }

  setTab(tab: 'active' | 'history'): void {
    this.activeTab = tab;
    if (tab === 'active' && this.voucherReminders().length === 0) {
      this.loadVoucherReminders();
    }
    if (tab === 'history' && this.voucherHistory().length === 0) {
      this.loadVoucherHistory();
    }
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

  private loadVoucherHistory(): void {
    this.isLoadingVoucherHistory.set(true);
    this.voucherHistoryError.set('');

    this.http.get<any>(`${this.membershipBaseUrl}/members-voucher/history`).subscribe({
      next: (res: any) => {
        this.voucherHistory.set(res.data?.rows || []);
        this.isLoadingVoucherHistory.set(false);
      },
      error: (_err: any) => {
        this.voucherHistory.set([]);
        this.voucherHistoryError.set('Failed to load voucher history');
        this.isLoadingVoucherHistory.set(false);
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
