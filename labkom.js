

const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// const npm = '10123290';
// URL yang akan di-scrape
async function scrapeData(npm) {
    const url =  `https://vm.lepkom.gunadarma.ac.id/kelulusan/search/${npm}`;

// Fungsi utama untuk scraping
    try {
        // Fetch HTML dari halaman
        const { data } = await axios.get(url);

        // Load HTML ke cheerio untuk parsing
        const $ = cheerio.load(data);

        // Array untuk menampung hasil
        let results = [];
        
        // Variabel pembatas jumlah hasil (maksimal 4)
        let count = 0;

        // Looping melalui setiap baris tabel yang ada di tbody
        $('tbody tr').each((index, element) => {
            // Membatasi hasil hanya sampai 4
            if (count >= 2) {
                return false; // Menghentikan loop jika sudah mencapai 4 hasil
            }

            const tds = $(element).find('td');

            // Mengecek apakah ada data dalam tabel
            if (tds.length > 0) {
                const result = {
                no: $(tds[0]).text().trim(), 
                npm: $(tds[1]).text().trim(),
                nama: $(tds[2]).text().trim(),
                kelas: $(tds[3]).text().trim(),
                semester_periode: $(tds[4]).text().replace(/\s+/g, ' ').trim(),
                materi_kursus: $(tds[5]).text().trim(),
                wilayah: $(tds[6]).text().trim(),
                status_kelulusan: $(tds[7]).find('b').text().trim(),  // Mengambil teks dalam elemen <b> untuk status kelulusan
                tanggal_ambil_sertifikat: $(tds[8]).find('b').text().trim(),  // Mengambil teks dalam elemen <b> untuk tanggal ambil sertifikat
                };

                // Menambahkan hasil ke array results
                results.push(result);
                count++; // Menambah jumlah hasil yang sudah diambil
            }
        });

        // Cetak hasil sebagai JSON (maksimal 4 hasil)
        console.log(JSON.stringify(results, null, 2));

    } catch (error) {
        console.error('Terjadi kesalahan saat melakukan scraping:', error);
}
}

rl.question('Masukkan nama mahasiswa semester 3: ', (inputNpm) => {
    scrapeData(inputNpm).then(() => {
        rl.close(); // Menutup interface readline setelah selesai
    });
});
