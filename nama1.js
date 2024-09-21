
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeData(nama) {
    const url = `http://baak.gunadarma.ac.id/cariMhsBaru?_token=pWmOnet4K2EPBjTyH3H0v13DwfWOIXFvQlvfRrpg&tipeMhsBaru=Nama&teks=${nama}`;

    try {
        // Melakukan permintaan GET
        const response = await axios.get(url);
        const html = response.data;

        // Memuat HTML ke cheerio
        const $ = cheerio.load(html);
        const rows = $('tbody tr'); // Mengambil semua baris dalam tbody

        rows.each((index, row) => {
            const tds = $(row).find('td'); // Mengambil semua elemen <td> dalam baris
            
            if (tds.length > 0) {
                const data = {
                    no: $(tds[0]).text(),
                    id: $(tds[1]).text(),
                    nama: $(tds[2]).text().trim(),
                    nim: $(tds[3]).text(),
                    kelas: $(tds[4]).text(),
                    program: $(tds[5]).text().trim(),
                };
                
                console.log(data); // Menampilkan data siswa
            }
        });

    } catch (error) {
        console.error(error);
    }
}

rl.question('Masukkan nama mahasiswa baru: ', (inputnama) => {
    scrapeData(inputnama).then(() => {
        rl.close(); // Menutup interface readline setelah selesai
    });
});