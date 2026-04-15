import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthSessionService } from '../../services/auth-session.service';
import { MembershipAuthService } from '../../services/membership-auth.service';

@Component({
  selector: 'app-login-welcome-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-welcome.page.html',
})
export class LoginWelcomePage implements OnInit {
  protected readonly isRegisterMode = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly apiStatus = signal('Checking API...');
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authSessionService = inject(AuthSessionService);
  private readonly membershipAuthService = inject(MembershipAuthService);

  protected readonly authForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    if (this.authSessionService.isAuthenticated()) {
      void this.router.navigateByUrl(this.getRedirectUrl());
      return;
    }

    this.loadApiStatus();
  }

  protected toggleMode(): void {
    const nextMode = !this.isRegisterMode();

    this.isRegisterMode.set(nextMode);
    this.successMessage.set('');
    this.errorMessage.set('');

    const nameControl = this.authForm.controls.name;
    if (nextMode) {
      nameControl.addValidators([Validators.required, Validators.minLength(2)]);
    } else {
      nameControl.clearValidators();
      nameControl.setValue('');
    }

    nameControl.updateValueAndValidity();
  }

  protected submit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.isRegisterMode()) {
      this.authForm.controls.name.addValidators([Validators.required, Validators.minLength(2)]);
      this.authForm.controls.name.updateValueAndValidity();
    }

    this.authForm.markAllAsTouched();
    if (this.authForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);

    if (this.isRegisterMode()) {
      const { name, email, password } = this.authForm.getRawValue();

      this.membershipAuthService.register({ name, email, password }).subscribe({
        next: (response) => {
          this.membershipAuthService.login({ email, password }).subscribe({
            next: (loginResponse) => {
              this.isSubmitting.set(false);
              this.persistAuthSession(loginResponse.data.token, loginResponse.data.member);
              this.successMessage.set(response.message || 'Register and login success');
              void this.router.navigateByUrl(this.getRedirectUrl());
            },
            error: (error: HttpErrorResponse) => {
              this.isSubmitting.set(false);
              this.errorMessage.set(this.resolveErrorMessage(error));
            },
          });
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(this.resolveErrorMessage(error));
        },
      });

      return;
    }

    const { email, password } = this.authForm.getRawValue();
    this.membershipAuthService.login({ email, password }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.persistAuthSession(response.data.token, response.data.member);
        this.successMessage.set(response.message || 'Login success');
        void this.router.navigateByUrl(this.getRedirectUrl());
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(this.resolveErrorMessage(error));
      },
    });
  }

  private loadApiStatus(): void {
    this.membershipAuthService.ping().subscribe({
      next: (response) => {
        this.apiStatus.set(`API connected: ${response.source}`);
      },
      error: () => {
        this.apiStatus.set('API unavailable. Check server URL or CORS settings.');
      },
    });
  }

  private getRedirectUrl(): string {
    return this.activatedRoute.snapshot.queryParamMap.get('redirectTo') || '/dashboard';
  }

  private persistAuthSession(token: string, member: { id: number; name: string; email: string; createdAt: string }): void {
    this.authSessionService.persistSession(token, member);
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    return error.error?.message || 'Request failed. Please try again.';
  }
}
