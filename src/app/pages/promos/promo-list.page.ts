import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MembershipPointService } from '../../services/membership-point.service';

@Component({
  selector: 'app-promo-list-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './promo-list.page.html'
})
export class PromoListPage implements OnInit {
  readonly history = history;
  protected readonly promos = signal<any[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  private readonly service = inject(MembershipPointService);

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set('');

    this.service.getPromos().subscribe({
      next: (res) => {
        this.promos.set(res.data?.rows || []);
        this.loading.set(false);
      },
      error: () => {
        this.promos.set([]);
        this.error.set('Failed to load promos');
        this.loading.set(false);
      }
    });
  }
}
