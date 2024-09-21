const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeData(nama) {
    const url = `http://baak.gunadarma.ac.id/cariKelasBaru?_token=e4UmgXi5OuZT99yTzFWFIiWygaLlN62fqISYdgsI&tipeKelasBaru=Nama&teks=${nama}`;

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
                    no: $(tds[0]).text(),
                    npm: $(tds[1]).text(),
                    nama: $(tds[2]).text().trim(),
                    kelas_lama: $(tds[3]).text().trim(),
                    kelas_baru: $(tds[4]).text().trim(),
                };
                
                results.push(data); // Menyimpan data ke dalam array
            }
        });

        console.log(results); // Menampilkan seluruh hasil setelah selesai

    } catch (error) {
        console.error(error);
    }
}

// Meminta input dari pengguna
rl.question('Masukkan nama dari mahasiswa semester 3: ', (inputNama) => {
    scrapeData(inputNama).then(() => {
        rl.close(); // Menutup interface readline setelah selesai
    });
});