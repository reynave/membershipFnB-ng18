import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vouchers-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './vouchers.page.html',
})
export class VouchersPage implements OnInit {
  protected readonly vouchers = signal<any[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set('');

    this.http.get<any>(`${this.membershipBaseUrl}/vouchers`, { params: { all: '1' } }).subscribe({
      next: (res) => {
        this.vouchers.set(res.data?.rows || []);
        this.loading.set(false);
      },
      error: () => {
        this.vouchers.set([]);
        this.error.set('Failed to load vouchers');
        this.loading.set(false);
      }
    });
  }
}
