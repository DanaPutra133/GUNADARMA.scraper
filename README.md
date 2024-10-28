# GUNADARMA.scraper

Tools web scraping untuk mengambil data jadwal kursus mahasiswa dari platform LEBKOM Universitas Gunadarma dan BAAK. Proyek ini menggunakan Node.js dengan Axios dan Cheerio untuk mem-parsing HTML dan mengekstrak data berdasarkan NPM atau nomor kelas tertentu.

## Fitur

- Mengambil data jadwal dalam format JSON.
- Menyediakan informasi seperti `npm`, `nama`, `kelas`, `jadwal_kursus`, `kategori_kursus`, `lokasi`, dan lainnya.
- Mudah dikonfigurasi untuk berbagai kelas atau mahasiswa.

## Package

- Node.js
- Axios
- Cheerio

## cara install

1. Clone repositori:

   ```bash
   git clone https://github.com/DanaPutra133/GUNADARMA.scraper.git
   ```

2. Install module:

   ```
    npm install
   ```

## Cara Penggunaan

1. Jalankan scraper dengan NPM atau kode kelas tertentu:

   ```javascript
   node nama file nya.js
   ```

2. Sesuaikan skrip untuk mengambil data yang diinginkan.

## Contoh Hasil dari LABKOM

Output JSON:

```json
[
  {
    "no": "1",
    "npm": "npm",
    "nama": "nama",
    "kelas": "kelas",
    "jadwal_kursus": "DATABASE FOR BEGINNER / 1DBBR231514K",
    "kategori_kursus": "REGULER / KULIAH",
    "lokasi": "lokasi",
    "hari": "hari",
    "ruang": "ruangan",
    "sesi": "sesi"
  }
]
```

## Contoh Hasil dari BAAK

Output JSON:

```json
[
  {
    no: '1',
    npm: 'npm',
    nama: 'nama',
    kelas_lama: 'kelas lama dia',
    kelas_baru: 'kelas baru dia'
  }
]
```

## Kontribusi

Silakan kirimkan isu atau pull request untuk perbaikan atau fitur tambahan.

