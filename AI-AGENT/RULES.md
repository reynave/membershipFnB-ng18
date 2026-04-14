# RULES ANGULAR

Dokumen ini adalah aturan wajib untuk pengembangan frontend Angular pada proyek ini.

## DILARANG

1. Tidak boleh menggunakan fitur/function yang masih tahap pengembangan, uji coba, preview, developer preview, atau experimental. Gunakan hanya fitur yang sudah stabil/fix atau LTS.
2. Tidak boleh menggunakan `loadChildren` pada router.
3. Untuk request API `http.get` / `http.post`, wajib gunakan generic `any` agar development cepat selama kontrak response REST API belum final.

Contoh:

```ts
this.http.get<any>(url, options)
this.http.post<any>(url, body, options)
```

4. Jika ada tombol back atau aksi `back()`, tidak boleh pakai `router.navigate()` / `router.navigateByUrl()` untuk kembali ke halaman sebelumnya. Wajib menggunakan `history.back()`.

Contoh:

```ts
back(): void {
	history.back();
}
```
