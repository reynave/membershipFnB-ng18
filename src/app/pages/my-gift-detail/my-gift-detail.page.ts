import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, ElementRef, effect, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import JsBarcode from 'jsbarcode';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-gift-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-gift-detail.page.html',
})
export class MyGiftDetailPage implements OnInit {
  readonly history = history;
  protected readonly voucher = signal<any | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  private readonly barcodeSvg = viewChild<ElementRef<SVGElement>>('barcodeSvg');
  private readonly barcodeCanvas = viewChild<ElementRef<HTMLCanvasElement>>('barcodeCanvas');

  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly membershipBaseUrl = `${environment.apiBaseUrl}/membership`;

  constructor() {
    effect(() => {
      const v: any = this.voucher();
      const svgRef = this.barcodeSvg();
      if (!v || !v.barcode || !svgRef) return;
      const JsBarcodeLib: any = (JsBarcode as any)?.default ?? JsBarcode;
      try {
        const svgEl = svgRef.nativeElement;
        JsBarcodeLib(svgEl, String(v.barcode), {
          format: 'CODE128',
          displayValue: true,
          height: 60,
          width: 1.6,
          margin: 4,
          lineColor: '#000',
        });
      } catch (e) {
        console.warn('[MyGiftDetail] barcode render error', e);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Invalid id');
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.http.get<any>(`${this.membershipBaseUrl}/members-voucher/${id}`).subscribe({
      next: (res) => {
        this.voucher.set(res.data?.voucher || null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load voucher');
        this.loading.set(false);
      }
    });
  }
}
