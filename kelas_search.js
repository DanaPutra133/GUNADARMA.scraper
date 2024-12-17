const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeData(kelas) {
    const url = `http://baak.gunadarma.ac.id/jadwal/cariJadKul?_token=MMVYI8xKufDSvTKRFCnhbcr4KNSjzssaw1qSDt0g&teks=${kelas}`;

    try {
        // Melakukan permintaan GET
        const response = await axios.get(url);
        const html = response.data;

        // Memuat HTML ke cheerio
        const $ = cheerio.load(html);
        const rows = $('tbody tr'); // Mengambil semua baris dalam tbody
        const results = []; // Array untuk menyimpan hasil

        rows.each((index, row) => {
            const tds = $(row).find('td'); // Mengambil semua elemen <td> dalam baris
            
            if (tds.length > 0) {
                const data = {
                    Kelas: $(tds[0]).text(),
                    hari: $(tds[1]).text(),
                    Mata_kuliah: $(tds[2]).text().trim(),
                    Waktu: $(tds[3]).text().trim(),
                    Ruang: $(tds[4]).text().trim(),
                    Dosen: $(tds[5]).text().trim(),
                };
                
                results.push(data); // Menyimpan data ke dalam array
            }
        });

        console.log(results); // Menampilkan seluruh hasil setelah selesai

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Meminta input dari pengguna
rl.question('Masukkan kelas/ nama dosen kamu: ', (inputkelas) => {
    scrapeData(inputkelas).then(() => {
        rl.close(); // Menutup interface readline setelah selesai
    });
});