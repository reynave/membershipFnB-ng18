import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-redeem-voucher-qr-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redeem-voucher-qr.page.html',
})
export class RedeemVoucherQrPage {
  timerLabel = '04:59';

  back(): void {
    history.back();
  }

  refreshCode(): void {
    this.timerLabel = '05:00';
  }
}
