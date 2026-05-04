import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-loyalty-bonuses-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loyalty-bonuses.page.html',
})
export class LoyaltyBonusesPage implements OnInit {
  protected readonly tiers = signal<any[]>([]);
  protected readonly isLoadingTiers = signal(false);
  protected readonly tiersError = signal('');
  protected readonly tierProgress = signal<any | null>(null);
  protected readonly isLoadingTierProgress = signal(false);
  protected readonly tierProgressError = signal('');
  protected readonly isUpgradingTier = signal(false);

  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  ngOnInit(): void {
    this.loadTiers();
    this.loadTierProgress();
  }

  private loadTierProgress(): void {
    this.isLoadingTierProgress.set(true);
    this.tierProgressError.set('');

    this.http.get<any>(`${this.membershipBaseUrl}/tiers/progress`).subscribe({
      next: (res: any) => {
        this.tierProgress.set(res.data || null);
        this.isLoadingTierProgress.set(false);
      },
      error: () => {
        this.tierProgress.set(null);
        this.tierProgressError.set('Failed to load tier progress');
        this.isLoadingTierProgress.set(false);
      }
    });
  }

  private loadTiers(): void {
    this.isLoadingTiers.set(true);
    this.tiersError.set('');

    this.http.get<any>(`${this.membershipBaseUrl}/tiers`).subscribe({
      next: (res: any) => {
        this.tiers.set(res.data?.rows || []);
        this.isLoadingTiers.set(false);
      },
      error: () => {
        this.tiers.set([]);
        this.tiersError.set('Failed to load tiers');
        this.isLoadingTiers.set(false);
      }
    });
  }

  tierSubtitle(tier: any, index: number): string {
    const accumulation = Number(tier?.accumulationAmount || 0);
    if (index === 0 || accumulation <= 0) {
      return 'Entry';
    }

    return `${accumulation.toLocaleString()} pts`;
  }

  tierDescription(tier: any): string {
    const cashback = Number(tier?.percentOfCashBack || 0);
    const minAmount = Number(tier?.minAmount || 0);
    const maxPercent = Number(tier?.maxPercentOfBill || 0);
    const parts: string[] = [];

    if (cashback > 0) {
      parts.push(`Earn ${cashback}% cashback points on eligible spending.`);
    }
    if (minAmount > 0) {
      parts.push(`Minimum transaction ${minAmount.toLocaleString()}.`);
    }
    if (maxPercent > 0) {
      parts.push(`Redeem up to ${maxPercent}% of bill.`);
    }

    return parts.join(' ') || 'Membership tier benefits available.';
  }

  tierBadgeClass(index: number): string {
    if (index === 0) return 'bg-[#dcdcd9] text-[#6f746f]';
    if (index === 1) return 'bg-[#efd3bf] text-[#8d4d23]';
    return 'bg-[#c3d6c2] text-[#245426]';
  }

  progressLabel(): string {
    const progress = this.tierProgress();
    if (!progress) return 'Progress to next tier';
    if (progress.isHighestTier || !progress.nextTier) return 'Top tier reached';
    return `Progress to ${progress.nextTier.name}`;
  }

  onUpgradeTier(): void {
    if (this.isUpgradingTier()) return;

    const progress = this.tierProgress();
    if (!progress?.canUpgrade) return;

    this.isUpgradingTier.set(true);
    this.http.post<any>(`${this.membershipBaseUrl}/tiers/upgrade`, {}).subscribe({
      next: () => {
        this.isUpgradingTier.set(false);
        this.loadTierProgress();
      },
      error: () => {
        this.isUpgradingTier.set(false);
        this.tierProgressError.set('Failed to upgrade tier');
      }
    });
  }
}
