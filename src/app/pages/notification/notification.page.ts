import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  SocketNotificationService,
  SocketNotification,
  NotificationType,
} from '../../services/socket-notification.service';
import { PointInEvent, RedeemSuccessEvent, RedeemFailedEvent } from '../../services/socket.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.page.html',
})
export class NotificationPage implements OnInit {
  protected notification: SocketNotification | null = null;
    public environment = environment;
  private readonly router = inject(Router);
  private readonly socketNotificationService = inject(SocketNotificationService);

  ngOnInit(): void {
    this.notification = this.socketNotificationService.get();

    if (!this.notification) {
      void this.router.navigate(['/dashboard']);
    }
  }

  protected get type(): NotificationType | null {
    return this.notification?.type ?? null;
  }

  protected get isPointIn(): boolean {
    return this.notification?.type === 'point:in';
  }

  protected get isRedeemSuccess(): boolean {
    return this.notification?.type === 'redeem:success';
  }

  protected get isRedeemFailed(): boolean {
    return this.notification?.type === 'redeem:failed';
  }

  protected get pointInPayload(): PointInEvent | null {
    if (!this.isPointIn) return null;
    return this.notification!.payload as PointInEvent;
  }

  protected get redeemSuccessPayload(): RedeemSuccessEvent | null {
    if (!this.isRedeemSuccess) return null;
    return this.notification!.payload as RedeemSuccessEvent;
  }

  protected get redeemFailedPayload(): RedeemFailedEvent | null {
    if (!this.isRedeemFailed) return null;
    return this.notification!.payload as RedeemFailedEvent;
  }

  protected formatTimestamp(ts: string): string {
    try {
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(ts));
    } catch {
      return ts;
    }
  }

  protected formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  goBack(): void {
    const fromPath = this.notification?.fromPath ?? '/dashboard';
    this.socketNotificationService.clear();
    void this.router.navigate([fromPath]);
  }
}
