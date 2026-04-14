# TODO USER - ANGULAR MEMBERSHIP APP

Gunakan daftar ini untuk membagi kerja AI dan Developer agar tidak saling tabrakan.

## Status Key

- `TODO` = belum dikerjakan
- `IN_PROGRESS` = sedang dikerjakan owner
- `BLOCKED` = terhambat dependency/keputusan
- `REVIEW` = menunggu review/validasi
- `DONE` = selesai

## Aturan Singkat

- Wajib isi `Owner` sebelum mengubah status ke `IN_PROGRESS`.
- Jika task sudah `IN_PROGRESS`, owner lain tidak mengambil task itu.
- Jika perlu kerja bersama, set `Owner = PAIR`.

## Task Board

| ✓ | ID | Task | Scope | Owner | Status | Priority | Dependency | Notes |
|---|---|---|---|---|---|---|---|---|
| ✅ | T-000 | Generate Angular environments | Setup file environment.ts dan environment.development.ts | DEV | DONE | High | - | Selesai via `ng generate environments` |
| ✅ | T-001 | Setup struktur page Angular | Routing + folder pages | AI | DONE | High | - | Selesai: 8 page scaffold + lazy routes + build sukses |
| ✅ | T-002 | Layout global mobile app | Header + bottom nav + container | AI | DONE | High | T-001 | Selesai: app shell mobile + top bar + bottom nav + route-aware chrome |
| ✅ | T-003 | Halaman Login/Welcome | UI parity dari Stitch | AI | DONE | High | T-002 | Selesai: hero background, login card, form mock, social auth |
| ✅ | T-004 | Halaman Dashboard Member | UI parity + section card/voucher | AI | DONE | High | T-002 | Selesai: poin card, QR CTA, curation cards, active vouchers |
| ✅ | T-005 | Halaman Loyalty & Bonuses | UI parity + challenge cards | AI | DONE | Medium | T-002 | Selesai: tier card, challenge cards, featured quest, journey card |
| ✅ | T-006 | Halaman F&B Categories | UI parity + category cards | AI | DONE | Medium | T-002 | Selesai: header, search, category grid, curated strip |
| ✅ | T-007 | Halaman Voucher Wallet | UI parity + tabs active/expired | AI | DONE | Medium | T-002 | Selesai: tabs, featured voucher, list, progress card |
| ✅ | T-008 | Halaman Redeem Voucher QR | UI parity + timer state mock | AI | DONE | Medium | T-002 | Selesai: layout redeem, QR card, timer mock, back pakai history.back() |
| ✅ | T-009 | Halaman Redemption History | UI parity + list/history | AI | DONE | Medium | T-002 | Selesai: hero, stats cards, search/filter, history list |
| ✅ | T-010 | Halaman Point History | UI parity + filter tabs/list | AI | DONE | Medium | T-002 | Selesai: point summary + timeline activity + build bersih |
| ✅ | T-016 | Tailwind + Google Icons Migration | Install, config, dan konversi template utility-first | AI | DONE | High | T-003..T-010 | Selesai: tailwind v3, postcss, material symbols, all page templates pakai utility classes |
| ⬜ | T-011 | Mapping data model awal | Interface TS untuk mock data | DEV | TODO | High | T-001 | Bentuk data final untuk API contract |
| ⬜ | T-012 | Integrasi API Auth | Login endpoint + error handling | DEV | TODO | High | T-003, T-011 | Implementasi real auth |
| ⬜ | T-013 | Integrasi API Membership | Dashboard, points, vouchers | DEV | TODO | High | T-004, T-007, T-010, T-011 | Replace mock bertahap |
| ⬜ | T-014 | QA visual parity | Bandingkan per screen dengan Stitch | PAIR | TODO | Medium | T-003..T-010 | Cek mobile responsiveness |
| ⬜ | T-015 | Hardening release | Perf, accessibility, edge states | PAIR | TODO | Medium | T-012, T-013 | Final pass sebelum release |

## Change Log

| Date | ID Task | Perubahan | Oleh |
|---|---|---|---|
| 2026-04-14 | T-016 | Setup Tailwind + Google Material Symbols + migrasi template ke utility classes + build sukses | AI |
| 2026-04-14 | T-010 | Implement UI Point History dan validasi build bersih | AI |
| 2026-04-14 | T-009 | Implement UI Redemption History dan validasi build bersih | AI |
| 2026-04-14 | T-008 | Implement UI Redeem Voucher QR + timer mock + back via history.back | AI |
| 2026-04-14 | T-007 | Implement UI Voucher Wallet dan validasi build bersih | AI |
| 2026-04-14 | T-006 | Implement UI F&B Categories dan validasi build bersih | AI |
| 2026-04-14 | T-005 | Implement UI Loyalty & Bonuses dan validasi build bersih | AI |
| 2026-04-14 | T-004 | Implement UI Dashboard Member dan validasi build bersih | AI |
| 2026-04-14 | T-003 | Implement UI Login/Welcome dan validasi build bersih | AI |
| 2026-04-14 | T-002 | Implement layout global mobile dengan top bar dan bottom nav | AI |
| 2026-04-14 | T-001 | Scaffold struktur pages Angular dan routing utama selesai | AI |
| 2026-04-14 | T-000 | Generate folder environments Angular dan simpan hasil | DEV |
| 2026-04-14 | INIT | Inisialisasi task board AI + Developer | AI |
