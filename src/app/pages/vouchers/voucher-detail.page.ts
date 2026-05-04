import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-voucher-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voucher-detail.page.html'
})
export class VoucherDetailPage implements OnInit {
  readonly history = history;
  protected readonly voucher = signal<any | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly hideCta = signal(false);
  protected readonly toast = signal<{ message: string; type?: 'info' | 'success' | 'error' } | null>(null);

  private toastTimer: any = null;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ngOnInit(): void {
    const from = this.route.snapshot.queryParamMap.get('from');
    this.hideCta.set(from === 'my-gift');
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Invalid voucher id');
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.http.get<any>(`${this.membershipBaseUrl}/vouchers/${id}`).subscribe({
      next: (res) => {
        this.voucher.set(res.data?.voucher || res.data || null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load voucher');
        this.loading.set(false);
      }
    });
  }

  redeem(): void {
    const v = this.voucher();
    if (!v?.id) return;

    const requiredPoints = Number(v.pointsRequired || 0);
    if (!Number.isFinite(requiredPoints) || requiredPoints <= 0) {
      this.showToast('Voucher points is invalid', 'error');
      return;
    }

    if (!confirm(`Redeem voucher ${v.name} for ${requiredPoints} points?`)) {
      return;
    }

    this.loading.set(true);
    this.http.get<any>(`${this.membershipBaseUrl}/points/balance`).subscribe({
      next: (balanceRes) => {
        const balance = Number(balanceRes?.data?.balancePoint || 0);

        if (balance < requiredPoints) {
          this.showToast(`Insufficient point balance. Current: ${balance}, required: ${requiredPoints}`, 'error');
          this.loading.set(false);
          return;
        }

        this.http.post<any>(`${this.membershipBaseUrl}/voucher-redeem`, { voucherId: v.id }).subscribe({
          next: (res) => {
            this.loading.set(false);
            this.showToast(res.message || 'Voucher redeemed', 'success');
            setTimeout(() => this.router.navigate(['/vouchers']), 700);
          },
          error: (err) => {
            this.showToast(err?.error?.message || 'Failed to redeem voucher', 'error');
            this.loading.set(false);
          }
        });
      },
      error: () => {
        this.showToast('Failed to check point balance', 'error');
        this.loading.set(false);
      }
    });
  }

  private showToast(message: string, type: 'info' | 'success' | 'error' = 'info') {
    this.toast.set({ message, type });
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => this.toast.set(null), 3000);
  }
}
