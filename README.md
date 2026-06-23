# Portfolio Nabila Permatasari Laksono

Website portofolio modern berbasis HTML, CSS, dan JavaScript. Bagian repository GitHub otomatis mengambil repository publik dari GitHub API.

## Isi File

- `index.html` — halaman utama portofolio
- `style.css` — desain tampilan website
- `app.js` — interaksi website dan koneksi GitHub API
- `app.jss` — salinan dari `app.js` sesuai nama file yang diminta
- `server.js` — server Express untuk menjalankan website secara lokal
- `package.json` — konfigurasi Node.js
- `assets/CV_Nabila_Permatasari_Laksono.pdf` — file CV untuk tombol download

## Cara Menghubungkan ke GitHub

1. Buka file `app.js`.
2. Cari baris berikut:

```js
const GITHUB_USERNAME = "ganti-username-github";
```

3. Ganti dengan username GitHub yang benar, contoh:

```js
const GITHUB_USERNAME = "nabilapermatasari";
```

4. Simpan file, lalu refresh halaman.

## Cara Menjalankan Langsung

Cukup buka file `index.html` di browser.

## Cara Menjalankan Sebagai Web Server Lokal

```bash
npm install
npm start
```

Lalu buka:

```bash
http://localhost:3000
```

## Upload ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload semua file ke repository.
3. Masuk ke `Settings` → `Pages`.
4. Pada bagian `Build and deployment`, pilih branch `main` dan folder `/root`.
5. Klik `Save`.

Website akan aktif melalui link GitHub Pages setelah proses deploy selesai.
