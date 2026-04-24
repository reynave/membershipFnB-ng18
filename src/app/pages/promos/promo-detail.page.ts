import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MembershipPointService } from '../../services/membership-point.service';

@Component({
  selector: 'app-promo-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-detail.page.html'
})
export class PromoDetailPage implements OnInit {
  readonly history = history;
  protected readonly promo = signal<any | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MembershipPointService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Invalid promo id');
      this.loading.set(false);
      return;
    }

    this.service.getPromo(id).subscribe({
      next: (res) => {
        this.promo.set(res.data?.promo || res.data || null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load promo');
        this.loading.set(false);
      }
    });
  }
}
