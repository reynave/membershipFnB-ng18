import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { AuthSessionService } from './services/auth-session.service';

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

  constructor() {
    this.updateRouteState();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateRouteState());
  }

  logout(): void {
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
