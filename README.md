```GUNADARMA.scraper```

Alat web scraping untuk mengambil data jadwal kursus mahasiswa dari platform LEPKOM Universitas Gunadarma. Proyek ini menggunakan Node.js dengan Axios dan Cheerio untuk mem-parsing HTML dan mengekstrak data berdasarkan NPM atau kode kelas tertentu.

Fitur

Mengambil data jadwal dalam format JSON.
Menyediakan informasi seperti npm, nama, kelas, jadwal_kursus, kategori_kursus, lokasi, dan lainnya.
Mudah dikonfigurasi untuk berbagai kelas atau mahasiswa.
Persyaratan

Node.js
Axios
Cheerio
Instalasi

Clone repositori:
bash
Copy code
git clone https://github.com/DanaPutra133/GUNADARMA.scraper.git
Instal dependensi:
bash
Copy code
cd GUNADARMA.scraper
npm install
Cara Penggunaan

Jalankan scraper dengan NPM atau kode kelas tertentu:
javascript
Copy code
node scraper.js
Sesuaikan skrip untuk mengambil data yang diinginkan.
Contoh Hasil

Output JSON:

json
[
  {
    "no": "1",
    "npm": "10123290",
    "nama": "DANA PUTRA SATRIA GATTI",
    "kelas": "2KA14",
    "jadwal_kursus": "DATABASE FOR BEGINNER / 1DBBR231514K",
    "kategori_kursus": "REGULER / KULIAH",
    "lokasi": "DEPOK",
    "hari": "JUMAT",
    "ruang": "F491",
    "sesi": "4"
  }
]
