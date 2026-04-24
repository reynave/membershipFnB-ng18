import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ngOnInit(): void {
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

    if (!confirm(`Redeem voucher ${v.name} for ${v.pointsRequired || v.pointsAmount || 0} points?`)) {
      return;
    }

    this.loading.set(true);
    this.http.post<any>(`${this.membershipBaseUrl}/voucher-redeem`, { voucherId: v.id }).subscribe({
      next: (res) => {
        alert(res.message || 'Voucher reserved');
        this.loading.set(false);
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to redeem voucher');
        this.loading.set(false);
      }
    });
  }
}
