# AGENT USER PLAYBOOK

Dokumen ini adalah onboarding cepat untuk AI Agent frontend (Angular) agar bisa langsung kerja dengan aman, cepat, dan konsisten.

## 1) Tujuan

- Mempercepat delivery frontend Angular berdasarkan desain Stitch.
- Menjaga sinkronisasi kerja antara AI Agent dan Developer.
- Menghindari perubahan yang memecah flow bisnis existing.

## 2) Ringkasan Arsitektur Frontend

- Path project frontend: `user/`
- Framework: Angular (standalone components)
- Styling: Tailwind CSS + Material Symbols
- Routing: lazy `loadComponent` per halaman
- Auth model:
	- Login/register ke backend membership
	- JWT disimpan di localStorage via `AuthSessionService`
	- Interceptor auto tambah `Authorization: Bearer ...`
	- `authGuard` proteksi semua route non-login

## 3) Sumber Kebenaran (Wajib Dibaca Dulu)

1. `AI-AGENT/TODO-USER.md` (status task dan ownership)
2. `AI-AGENT/RULES.md` (aturan teknis wajib)
3. `src/app/app.routes.ts` (map halaman)
4. `src/app/services/` (kontrak API frontend)
5. `stitchUser/*/code.html` (referensi desain)

## 4) Aturan Wajib Frontend

Ikuti aturan ini tanpa pengecualian:

1. Dilarang pakai fitur Angular experimental/preview.
2. Dilarang pakai `loadChildren`.
3. Request API wajib generic `any`:

```ts
this.http.get<any>(url, options)
this.http.post<any>(url, body, options)
```

4. Aksi back wajib `history.back()` (bukan `router.navigate`).
5. Jangan ubah API contract backend tanpa instruksi eksplisit.
6. Jangan ubah task owner lain yang sedang `IN_PROGRESS`.

## 5) Konvensi Date & Timezone

- Backend simpan timestamp dalam UTC.
- Frontend menampilkan waktu lokal berdasarkan setting environment.
- Variable timezone ada di:
	- `src/environments/environment.ts`
	- `src/environments/environment.development.ts`
- Nilai saat ini: `+7` (WIB).
- Saat implementasi date display, gunakan satu pendekatan yang konsisten agar semua halaman sama timezone.

## 6) Halaman Utama dan Tanggung Jawab

- `login-welcome`: login/register flow
- `dashboard-member-detail`: tampilkan point balance member
- `point-history`: riwayat perolehan/penggunaan point dari API
- `redemption-history`: histori redeem (masih dominan mock UI)
- `voucher-wallet`: daftar voucher
- `redeem-voucher-qr`: flow QR redeem
- `notification`: tampilkan event realtime dari Socket.IO (`point:in`, `redeem:success`, `redeem:failed`)
- `profile-user`: profile dan aksi back

## 7) Pembagian Peran (AI vs Developer)

### AI Agent fokus

- Scaffolding/rapikan page dan komponen
- Integrasi API sisi presentasi (tanpa ubah kontrak backend)
- Styling + responsive behavior sesuai desain
- Refactor aman yang tidak mengubah behavior bisnis
- Update TODO dan change log

### Developer fokus

- Keputusan bisnis final
- Validasi fungsional, QA/UAT
- Kebijakan security produksi
- Approval perubahan besar (arsitektur/dependency)

### Pair (AI + Developer)

- UI parity check vs Stitch
- Verifikasi edge case flow login, history, redeem
- Final hardening sebelum release

## 8) Workflow Task yang Benar

1. Cek `TODO-USER.md`.
2. Pilih task yang statusnya bukan `IN_PROGRESS` owner lain.
3. Set `Owner` lalu ubah status jadi `IN_PROGRESS`.
4. Kerjakan perubahan kecil dan terfokus.
5. Validasi minimal: build sukses dan route terkait berjalan.
6. Update notes, ubah status ke `DONE` atau `REVIEW`.
7. Tambah entri `Change Log` dengan tanggal.

## 9) Definition of Done (DoD)

Task frontend dianggap selesai jika:

- UI sesuai desain referensi (deviasi minor harus dijelaskan)
- Tidak menambah error compile/lint
- Alur halaman bisa diakses dan berfungsi
- Tidak melanggar `RULES.md`
- TODO terupdate (owner, status, notes, changelog)

## 10) Larangan Umum

- Jangan hardcode data bisnis permanen di template.
- Jangan tambah dependency baru tanpa kebutuhan kuat.
- Jangan ubah style global secara agresif jika tidak diminta.
- Jangan refactor lintas banyak halaman sekaligus dalam satu task kecil.

## 11) File Penting Cepat

- `src/app/app.config.ts` -> provider global, interceptor
- `src/app/app.routes.ts` -> peta route seluruh app
- `src/app/guards/auth.guard.ts` -> proteksi auth
- `src/app/interceptors/auth-token.interceptor.ts` -> injeksi bearer token
- `src/app/services/auth-session.service.ts` -> simpan session login
- `src/app/services/membership-auth.service.ts` -> API login/register
- `src/app/services/membership-point.service.ts` -> API points
- `src/app/pages/notification/notification.page.ts` -> format notifikasi socket

## 12) Checklist Saat AI Agent Baru Masuk

Gunakan checklist ini sebelum coding:

- [ ] Sudah baca `TODO-USER.md`
- [ ] Sudah baca `RULES.md`
- [ ] Sudah cek task owner lain yang sedang aktif
- [ ] Sudah pahami halaman target + API yang dipakai
- [ ] Sudah tahu dampak ke auth/session/routing
- [ ] Sudah rencanakan update changelog setelah selesai
