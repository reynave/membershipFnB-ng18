import { Injectable } from '@angular/core';

import { PointInEvent, RedeemFailedEvent, RedeemSuccessEvent } from './socket.service';

export type NotificationType = 'point:in' | 'redeem:success' | 'redeem:failed';

export interface SocketNotification {
  type: NotificationType;
  payload: PointInEvent | RedeemSuccessEvent | RedeemFailedEvent;
  fromPath: string;
}

@Injectable({ providedIn: 'root' })
export class SocketNotificationService {
  private current: SocketNotification | null = null;

  set(notification: SocketNotification): void {
    this.current = notification;
  }

  get(): SocketNotification | null {
    return this.current;
  }

  clear(): void {
    this.current = null;
  }
}
