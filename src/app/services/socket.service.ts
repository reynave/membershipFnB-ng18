import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../environments/environment';
import { AuthSessionService } from './auth-session.service';

export interface PointInEvent {
  transactionId: number;
  pointIn: number;
  bill: string;
  totalAmount: number;
  tier: string;
  timestamp: string;
}

export interface RedeemSuccessEvent {
  point: number;
  approvalCode: string;
  status: string;
  redeemCode: string;
  timestamp: string;
}

export interface RedeemFailedEvent {
  message: string;
  redeemCode: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class SocketService implements OnDestroy {
  private socket: Socket | null = null;

  readonly pointIn$ = new Subject<PointInEvent>();
  readonly redeemSuccess$ = new Subject<RedeemSuccessEvent>();
  readonly redeemFailed$ = new Subject<RedeemFailedEvent>();

  private readonly authSessionService = inject(AuthSessionService);

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    const socketUrl = environment.apiBaseUrl.replace('/api', '');

    this.socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      const member = this.authSessionService.getMember();

      if (member?.id) {
        this.socket!.emit('member:join', member.id);
      }
    });

    this.socket.on('point:in', (data: PointInEvent) => {
      this.pointIn$.next(data);
    });

    this.socket.on('redeem:success', (data: RedeemSuccessEvent) => {
      this.redeemSuccess$.next(data);
    });

    this.socket.on('redeem:failed', (data: RedeemFailedEvent) => {
      this.redeemFailed$.next(data);
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
