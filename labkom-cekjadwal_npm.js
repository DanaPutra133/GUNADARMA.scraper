const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeData(npm) {
    const url = `https://vm.lepkom.gunadarma.ac.id/jadwalPraktikan/search/${npm}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let result = {};

        $('tbody tr').each((index, element) => {
            const tds = $(element).find('td');
            if (tds.length > 0) {
                result = {
                    no: $(tds[0]).text().trim(),
                    npm: $(tds[1]).text().trim(),
                    nama: $(tds[2]).text().trim(),
                    kelas: $(tds[3]).text().trim(),
                    jadwal_kursus: $(tds[4]).text().replace(/\s+/g, ' ').trim(),
                    kategori_kursus: $(tds[5]).text().replace(/\s+/g, ' ').trim(),
                    lokasi: $(tds[6]).text().trim(),
                    hari: $(tds[7]).text().trim(),
                    ruang: $(tds[8]).text().trim(),
                    sesi: $(tds[9]).text().trim(),
                };
            }
        });

        console.log(JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('Terjadi kesalahan saat melakukan scraping:', error);
    }
}

rl.question('Masukkan npm mahasiswa: ', (inputNpm) => {
    scrapeData(inputNpm).then(() => {
        rl.close(); 
    });
});
