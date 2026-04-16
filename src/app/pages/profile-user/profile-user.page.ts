import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthSessionService } from '../../services/auth-session.service';

@Component({
  selector: 'app-profile-user-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-user.page.html',
})
export class ProfileUserPage implements OnInit {
  protected fullName = '';
  protected email = '';
  protected phone = '';
  protected saveMessage = '';

  private readonly authSessionService = inject(AuthSessionService);

  ngOnInit(): void {
    const member = this.authSessionService.getMember();

    this.fullName = member?.name || 'Member';
    this.email = member?.email || '';
  }

  protected back(): void {
    history.back();
  }

  protected saveProfile(): void {
    this.saveMessage = 'Profile changes saved locally.';
  }
}