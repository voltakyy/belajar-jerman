# Ruang Belajar Bahasa Jerman (Deutsch im Alltag) 🇩🇪

Platform web belajar mandiri bahasa Jerman berbasis prinsip ilmiah **Comprehensible Input (CI)** dan **Lexical Chunking** (Michael Lewis). Didesain khusus untuk pemula hingga menengah agar mampu berkomunikasi dalam situasi nyata tanpa terjebak hafalan tabel tata bahasa yang rumit.

Aplikasi ini menggunakan tema visual **Deep Navy & Warm Amber / Terracotta** dengan geometri tegas (*crisp, non-rounded*, radius 4px - 6px) tanpa tombol kapsul/bengkak, serta didukung audio browser native **Web Speech API (`de-DE`)**.

---

## 🌟 Fitur Utama

- **8+ Kategori Dialog Nyata**:
  - 👋 Perkenalan Diri & Asal Indonesia (`Begrüßung & Sich vorstellen`)
  - ☕ Kafe & Restoran (`Im Café bestellen`)
  - 💳 Pembayaran & Tip (*Trinkgeld*)
  - 🥖 Toko Roti Tradisional (`In der Bäckerei`)
  - 🛒 Supermarket & Daur Ulang Botol (*Pfandsystem*)
  - 🚆 Stasiun Kereta Api DB (`Am Hauptbahnhof`)
  - 💊 Apotek & Gejala Sakit (`In der Apotheke`)
  - 🔥 Ungkapan Gaul Harian (*Umgangssprache*)
- **Gym Latihan Pola Kalimat Interaktif (*Satzbau Drills*)**:
  - Kolom isian teks kustom untuk setiap slot (`[Kota]`, `[Profesi]`, `[Aktivitas]`, dll).
  - Tulis kata sendiri (contoh: "Jakarta", "Softwareentwickler") dan lihat kalimat terpasang seketika (*live preview*).
  - Pengejaan dan pelafalan otomatis via Web Speech API langsung saat menekan `Enter` atau tombol `🔊`.
  - Tombol variasi cepat (*preset chips*) dan tombol reset.
- **Scaffolding Display Modes (Tangga Pemahaman)**:
  - 1. **Lengkap**: Deutsch + Fonetik lafal + Terjemahan Indonesia.
  - 2. **Deutsch Saja**: Fokus membaca teks asli (hover untuk intip lafal).
  - 3. **Lafal Saja**: Melatih pengucapan dan kepekaan telinga.
  - 4. **Blind Test**: Menguji memori aktif dari bahasa Indonesia.
- **Audio & Shadowing**:
  - Pengaturan kecepatan baca kontras tinggi di header atas (Default: **0.69x** santai, 0.85x sedang, 1.0x normal).
  - Mode Shadowing dengan jeda bernapas 3.4 detik antar baris agar pengguna dapat menirukan lafal.
- **Pewarnaan Gender Artikel (*der/die/das*)**:
  - Biru (*Maskulin/der*), Merah (*Feminin/die*), Hijau (*Netral/das*).
- **Bedah Kata & Laci Makna**:
  - Klik kata atau frasa dalam kalimat untuk membuka arti dan mendengarkan pelafalan per kata tanpa pop-up.
- **Buku Catatan Pribadi (⭐)**:
  - Simpan frasa penting ke buku catatan pribadi yang otomatis tersimpan di `localStorage`.
- **Kulturtipp & Catatan Budaya**:
  - Penjelasan etika ketepatan waktu (*Pünktlichkeit*), budaya roti, sapaan formal *Sie* vs informal *du*, dll.
- **Tema Dual**:
  - *Deep Navy Midnight* dan *Warm Daylight Paper*.

---

## 🛠️ Teknologi

- **Vite**: Build tool modern super cepat
- **Vanilla JavaScript**: Tanpa framework berat, responsif & performa tinggi
- **Vanilla CSS**: Desain kustom, tipografi Serif + Sans + Mono, responsif di HP & Desktop
- **Web Speech API**: Sintesis suara native Jerman (`de-DE`)

---

## 🚀 Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/voltakyy/belajar-jerman.git
   cd belajar-jerman
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan dev server**:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5174/`

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📝 Lisensi

MIT License © 2026 [voltakyy](https://github.com/voltakyy)
