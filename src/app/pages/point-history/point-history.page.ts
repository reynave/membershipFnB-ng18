import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-point-history-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="grid gap-4 px-4 pb-6 pt-5">
      <header>
        <h1 class="font-headline text-5xl font-bold leading-[.95] text-brand-900">Point History</h1>
        <p class="mt-2 text-sm text-[#4e574e]">Track your earned and redeemed points in one elegant timeline.</p>
      </header>

      <section class="grid grid-cols-2 gap-2">
        <article class="rounded-2xl bg-brand-900 p-4 text-[#f4ece2]"><span class="text-[10px] uppercase tracking-wide text-[#d8c9b7]">Available points</span><strong class="mt-2 block font-headline text-5xl leading-none">18,420</strong></article>
        <article class="rounded-2xl bg-[#ececea] p-4"><span class="text-[10px] uppercase tracking-wide text-[#666c66]">This month</span><strong class="mt-2 block font-headline text-5xl leading-none">+2,180</strong></article>
      </section>

      <div class="grid gap-2">
        <article class="rounded-xl bg-[#f6f4f0] p-3"><div class="flex items-start justify-between gap-2"><h3 class="font-semibold">Dining at Maison Lumiere</h3><span class="text-[11px] text-[#666c66]">Today</span></div><p class="text-xs text-[#666c66]">Member spend multiplier x2</p><strong class="mt-2 inline-flex rounded-full bg-[#d8e2d5] px-2 py-1 text-[11px] font-bold uppercase">+420 pts</strong></article>
        <article class="rounded-xl bg-[#f6f4f0] p-3"><div class="flex items-start justify-between gap-2"><h3 class="font-semibold">Redeemed Brunch Privilege</h3><span class="text-[11px] text-[#666c66]">2 days ago</span></div><p class="text-xs text-[#666c66]">Maison Lumiere voucher</p><strong class="mt-2 inline-flex rounded-full bg-[#f1d9c8] px-2 py-1 text-[11px] font-bold uppercase text-[#5e2e12]">-1,200 pts</strong></article>
        <article class="rounded-xl bg-[#f6f4f0] p-3"><div class="flex items-start justify-between gap-2"><h3 class="font-semibold">Coffee Journey Challenge</h3><span class="text-[11px] text-[#666c66]">Last week</span></div><p class="text-xs text-[#666c66]">Completed 4/4 partner visits</p><strong class="mt-2 inline-flex rounded-full bg-[#d8e2d5] px-2 py-1 text-[11px] font-bold uppercase">+960 pts</strong></article>
      </div>
    </section>
  `,
})
export class PointHistoryPage {}
