# AGENT USER PLAYBOOK

Dokumen ini adalah kontrak kerja antara AI Agent dan Developer untuk proyek membership app berbasis Angular.

## 1) Tujuan

- Mempercepat delivery frontend Angular berdasarkan desain di folder `stitchUser`.
- Mencegah tabrakan pekerjaan antara AI dan Developer.
- Menjaga kualitas kode tetap konsisten.

## 2) Sumber Desain

- Referensi utama: folder `stitchUser/*/code.html`.
- Bila ada perbedaan visual, prioritas desain mengikuti referensi Stitch.

## 3) Pembagian Peran

### AI Agent mengerjakan

- Scaffolding komponen/page Angular.
- Routing, struktur folder, reusable UI component.
- Styling dan responsive behavior mengikuti desain.
- Refactor aman (tanpa mengubah behavior bisnis tanpa instruksi).
- Menulis checklist teknis dan update status di TODO.

### Developer mengerjakan

- Keputusan bisnis/fungsional final.
- Integrasi backend/API nyata, auth production, security policy.
- Approval perubahan besar (arsitektur, dependency baru, breaking flow).
- QA final, UAT, dan keputusan release.

### Kolaboratif (AI + Developer)

- Review UI parity vs desain Stitch.
- Penyusunan acceptance criteria tiap halaman.
- Perbaikan bug yang ditemukan saat testing.

## 4) Aturan Anti-Bentrok

- Setiap task di TODO wajib punya `Owner` (AI/DEV/PAIR).
- Sebelum mulai task, ubah `Status` ke `IN_PROGRESS`.
- Satu task hanya boleh punya satu owner aktif kecuali `PAIR`.
- Jangan ubah task milik owner lain yang sedang `IN_PROGRESS` tanpa konfirmasi.
- Setelah selesai, ubah `Status` ke `DONE` dan isi `Notes` singkat.
- Jika terblokir, ubah ke `BLOCKED` dan tulis blocker spesifik.

## 5) Konvensi Implementasi Frontend

- Framework: Angular (standalone components diperbolehkan).
- Naming file/komponen: konsisten, deskriptif, lowercase-kebab-case untuk file.
- Hindari hardcode data bisnis di UI; gunakan mock data terpusat saat API belum siap.
- Komponen umum dipisah agar reusable (header, bottom-nav, card, badge, dsb).
- Mobile-first; minimum dukungan viewport umum mobile.

## 6) Definition of Done (DoD)

Task dianggap selesai jika:

- UI sesuai desain referensi dengan deviasi minor yang bisa dijelaskan.
- Tidak ada error build/lint yang baru akibat perubahan.
- Route/page terkait bisa diakses dan berjalan.
- TODO ter-update (`Status`, `Owner`, `Notes`, tanggal).

## 7) Prioritas Eksekusi Awal

1. Setup layout dasar aplikasi (top bar, content area, bottom nav).
2. Implement halaman Login/Welcome.
3. Implement Dashboard Member Detail.
4. Implement halaman lain bertahap (Loyalty, Categories, Wallet, Histories, Redeem QR).

## 8) Cara Pakai Dokumen Ini

- Gunakan file `TODO-user.md` sebagai single source of truth progres kerja.
- Update status sesering mungkin saat mulai/selesai task.
- Bila scope berubah, update dokumen ini terlebih dulu sebelum lanjut coding.
