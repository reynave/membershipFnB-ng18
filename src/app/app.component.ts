import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, merge, map } from 'rxjs';

import { AuthSessionService } from './services/auth-session.service';
import { SocketService, PointInEvent, RedeemSuccessEvent, RedeemFailedEvent } from './services/socket.service';
import { SocketNotificationService, NotificationType } from './services/socket-notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  hideChrome = false;

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authSessionService = inject(AuthSessionService);
  private readonly socketService = inject(SocketService);
  private readonly socketNotificationService = inject(SocketNotificationService);

  constructor() {
    this.updateRouteState();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateRouteState());

    if (this.authSessionService.isAuthenticated()) {
      this.socketService.connect();
    }

    merge(
      this.socketService.pointIn$.pipe(
        map((data: PointInEvent) => ({ type: 'point:in' as NotificationType, payload: data })),
      ),
      this.socketService.redeemSuccess$.pipe(
        map((data: RedeemSuccessEvent) => ({ type: 'redeem:success' as NotificationType, payload: data })),
      ),
      this.socketService.redeemFailed$.pipe(
        map((data: RedeemFailedEvent) => ({ type: 'redeem:failed' as NotificationType, payload: data })),
      ),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ type, payload }) => {
        if (this.router.url === '/notification') {
          return;
        }

        this.socketNotificationService.set({
          type,
          payload,
          fromPath: this.router.url,
        });

        void this.router.navigate(['/notification']);
      });
  }

  logout(): void {
    this.socketService.disconnect();
    this.authSessionService.clearSession();
    void this.router.navigate(['/login']);
  }

  private updateRouteState(): void {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    this.hideChrome = Boolean(currentRoute.snapshot.data['hideChrome']);
  }
}
