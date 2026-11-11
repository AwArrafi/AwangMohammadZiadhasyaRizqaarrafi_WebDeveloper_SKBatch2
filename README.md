# ASTER — Recruitment Landing Page

Landing page rekrutmen yang responsive untuk **ASTER**, brand fiktif yang dibuat khusus untuk mini assignment Web Developer. Kandidat bisa mencari lowongan, membandingkan informasi penting langsung dari kartu, lalu mencoba simulasi rekomendasi berbasis CV.

> ASTER bukan perusahaan nyata dan bukan representasi resmi pihak pemberi tugas. Semua lowongan, gaji, dan hasil rekomendasi adalah **data contoh**.

## Fitur utama

| Fitur | Perilaku |
|---|---|
| Navigasi | Link ke tiap section dengan smooth scroll, menu hamburger di mobile (tutup dengan Esc atau setelah memilih link) |
| Hero search | Kata kunci dan lokasi tersinkron dengan daftar lowongan, lalu "Cari Lowongan" menggulir ke hasil |
| Chip populer | Engineering, Design, Marketing, Data, Business langsung menerapkan filter |
| Carousel unggulan | Prev/next, indikator, counter `01 / 04`, swipe dan scroll horizontal native |
| Pencarian lowongan | Filter live untuk judul, departemen, deskripsi, lokasi, dan skill (semua kata harus cocok) |
| Filter departemen | Bisa dikombinasikan dengan kata kunci dan lokasi, dengan jumlah hasil per kategori |
| Hapus filter | Reset kata kunci, kategori, dan lokasi, plus empty state saat tidak ada hasil |
| Kartu lowongan | Judul, departemen, deskripsi singkat, **gaji**, lokasi, pengaturan kerja, tipe pekerjaan, skill, "Lihat Detail" |
| Detail lowongan | Dialog berisi tanggung jawab, kualifikasi, dan shortcut ke simulasi CV |
| Upload CV | Pilih file atau drag & drop, validasi PDF/DOCX maks. 5 MB, tampil nama dan ukuran file, ganti/hapus |
| Analisis CV | Wajib consent, loading 3 langkah, lalu rekomendasi dengan label kualitatif |
| FAQ | Accordion satu-terbuka, ikon plus/minus, aksesibel dengan keyboard |
| Footer | Link internal yang berfungsi, link halaman yang belum ada membuka penjelasan jujur |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript
- Tailwind CSS 4
- [lucide-react](https://lucide.dev) untuk ikon (satu-satunya dependency tambahan)
- Font Plus Jakarta Sans melalui `next/font` (self-hosted saat build)

Tidak ada backend, database, atau API eksternal.

## Menjalankan project

Butuh Node.js 22.18+ (test memakai type stripping bawaan Node).

```bash
npm install
npm run dev        # http://localhost:3000
```

Perintah lain:

```bash
npm run build      # build produksi
npm run start      # jalankan hasil build
npm run lint       # ESLint
npm run typecheck  # generate route types + tsc --noEmit
npm test           # unit test logika filter, gaji, validasi CV, dan pencocokan
```

## Struktur project

```
src/
├── app/
│   ├── layout.tsx              # font, metadata, <html lang="id">
│   ├── page.tsx                # merender <AsterPage />
│   ├── globals.css             # token warna, smooth scroll, reduced motion
│   └── icon.svg
├── components/
│   ├── aster-page.tsx          # pemilik state bersama (filter, lowongan terbuka, dialog info)
│   ├── navbar.tsx
│   ├── hero-section.tsx
│   ├── featured-job-carousel.tsx
│   ├── job-discovery-section.tsx
│   ├── job-card.tsx
│   ├── job-detail-dialog.tsx
│   ├── job-info.tsx            # potongan info lowongan yang dipakai ulang (gaji, fakta, skill)
│   ├── cv-matching-section.tsx
│   ├── faq-section.tsx
│   ├── footer.tsx              # footer + dialog info untuk halaman yang belum ada
│   └── modal.tsx               # wrapper <dialog> native
├── data/
│   ├── jobs.ts                 # tipe + satu sumber data lowongan
│   └── cv-simulation.ts        # contoh profil untuk simulasi CV
└── lib/
    ├── jobs.ts                 # filter, format gaji, label pengaturan kerja
    ├── cv.ts                   # validasi file, format ukuran, pencocokan kualitatif
    ├── styles.ts               # kelas tombol & container bersama
    └── logic.test.ts           # node:test
```

## Keputusan utama

- **Satu sumber data.** Carousel, daftar lowongan, detail, dan rekomendasi CV membaca array yang sama di `src/data/jobs.ts`, jadi tidak ada data yang diduplikasi.
- **State di satu tempat.** `AsterPage` memegang objek filter. Hero, daftar lowongan, dan footer menulis ke objek yang sama sehingga selalu sinkron tanpa state management library.
- **Logika murni dipisah dari UI.** Filter, format gaji, validasi file, dan pencocokan ada di `src/lib` sebagai fungsi biasa, sehingga mudah diuji dengan `node:test` tanpa test runner tambahan.
- **Fitur bawaan browser lebih dulu.** Carousel memakai scroll-snap CSS (swipe gratis, tanpa library carousel). Dialog memakai `<dialog>` native (focus trap, Esc, kembalinya fokus ke pemicu). FAQ memakai transisi `grid-template-rows`.
- **Informasi kerja tidak dicampur.** Lokasi, pengaturan kerja (On-site/WFO, Remote/WFH, Hybrid, WFA), dan tipe pekerjaan (Full-time, Part-time, Contract) adalah tiga field terpisah. Gaji tampil menonjol di kartu, dan jika tidak ada ditulis "Gaji tidak dicantumkan.", tidak pernah dikarang.
- **Tidak ada tombol mati.** Halaman yang tidak ada di prototipe (Hubungi Kami, Kebijakan Privasi, dll.) membuka dialog yang menjelaskan statusnya, bukan link kosong.
- **Revisi desain diterapkan.** Tiga kartu informasi ("Pencarian Peluang yang Terarah", dst.) dihapus sesuai keputusan tim, dan kartu lowongan diperkaya dengan gaji, lokasi, pengaturan kerja, dan tipe pekerjaan.

### Penyesuaian terhadap referensi Stitch / PRD

- Copy, data lowongan, FAQ, dan grup footer mengikuti brief implementasi terbaru jika berbeda dengan Stitch/PRD.
- Dua lowongan tambahan (Marketing dan Business) ditambahkan agar filter Marketing dan chip Business tidak selalu kosong. Salah satunya sengaja tanpa gaji untuk menunjukkan state "Gaji tidak dicantumkan.".
- Carousel menampilkan departemen, bukan nama perusahaan lain, karena ASTER diposisikan sebagai halaman karier satu perusahaan.
- Ikon media sosial dan klaim "terenkripsi" dari desain tidak dipakai karena akun dan fiturnya tidak ada.
- Tiga langkah cara kerja CV ditaruh di atas panel upload (seperti versi mobile Stitch). Panel hasil baru muncul setelah analisis dimulai, jadi tidak ada kartu kosong di samping form.
- Pesan error memakai palet biru yang sama (ikon + teks), bukan warna merah baru, untuk mematuhi aturan palet.

## Mock data & simulasi CV

- Semua lowongan di `src/data/jobs.ts` fiktif.
- **Analisis CV adalah simulasi frontend, bukan AI/parser sungguhan.** File hanya divalidasi dari nama dan ukurannya. Isinya tidak pernah dibaca, tidak diunggah ke server mana pun, dan tidak disimpan. File hilang saat dihapus atau halaman ditutup.
- Setelah consent dan animasi 3 langkah, aplikasi selalu memakai contoh profil di `src/data/cv-simulation.ts`. Rekomendasi dihitung dari jumlah skill yang sama dengan tiap lowongan:
  - 3+ skill: **Sangat Relevan**
  - 2 skill: **Relevan**
  - 1 skill: **Potensi Kecocokan**
  - Tanpa persentase, karena angka presisi akan terkesan lebih akurat daripada kenyataannya.
- Hasil ditandai "Hasil simulasi prototipe" di UI.

## Responsive

Diuji di lebar 1440, 768, 430, 390, dan 360 px tanpa horizontal overflow.

- **Desktop (≥1024px):** navigasi horizontal, hero dua kolom dengan carousel di kanan, grid lowongan 3 kolom, panel unggah CV selebar penuh (dropzone | persetujuan) dengan hasil rekomendasi 3 kolom di bawahnya, footer multi-kolom.
- **Tablet (768px):** hero bertumpuk, grid lowongan 2 kolom, form pencarian tetap satu baris.
- **Mobile (<768px):** menu hamburger (target sentuh 44px), form pencarian bertumpuk dengan tombol full width, chip kategori scroll horizontal, kartu satu kolom, teks dropzone berganti menjadi "Pilih CV dari perangkatmu", footer dua kolom.
- `prefers-reduced-motion` mematikan smooth scroll dan transisi.

## Penggunaan AI

Sesuai kebijakan assignment yang memperbolehkan AI tools:

- **Google Stitch** dipakai untuk membuat referensi desain desktop dan mobile serta PRD awal.
- **Claude Code (Anthropic)** membantu implementasi: membaca brief dan referensi desain, menyusun rencana komponen, menulis kode React/TypeScript, unit test, dan README ini, serta mengecek tampilan dan interaksi di browser pada beberapa lebar layar.
- Keputusan produk dan desain (brand ASTER, palet, revisi kartu lowongan, penghapusan tiga kartu informasi) ditentukan oleh developer. Developer juga meninjau dan menguji hasil kode dan bertanggung jawab penuh atas isinya.
# aster
