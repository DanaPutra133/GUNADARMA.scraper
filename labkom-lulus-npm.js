

const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// const npm = ''; kalau mau gak inout var ini pakai aja
// URL yang akan di-scrape
async function scrapeData(npm) {
    const url =  `https://vm.lepkom.gunadarma.ac.id/kelulusan/search/${npm}`;

// Fungsi utama untuk scraping
    try {
        // Fetch HTML dari halaman
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Array untuk menampung hasil
        let results = [];
        // Variabel pembatas jumlah hasil (maksimal 4)
        let count = 0;

        // Looping melalui setiap baris tabel yang ada di tbody
        $('tbody tr').each((index, element) => {
            // Membatasi hasil hanya sampai 4
            if (count >= 2) {
                return false; // Menghentikan loop jika sudah mencapai 2 hasil
                //jadi kalau 2 hasil result nya juga 2
            }
            const tds = $(element).find('td');
            if (tds.length > 0) {
                const result = {
                no: $(tds[0]).text().trim(), 
                npm: $(tds[1]).text().trim(),
                nama: $(tds[2]).text().trim(),
                kelas: $(tds[3]).text().trim(),
                semester_periode: $(tds[4]).text().replace(/\s+/g, ' ').trim(), //replace(/\s+/g, ' '). buat hasil nya gak ada \t\t\t\t\
                materi_kursus: $(tds[5]).text().trim(),
                wilayah: $(tds[6]).text().trim(),
                status_kelulusan: $(tds[7]).find('b').text().trim(),  
                tanggal_ambil_sertifikat: $(tds[8]).find('b').text().trim(),  
                };
                results.push(result);
                count++;
            }
        });

        // Cetak hasil sebagai JSON (maksimal 2)
        console.log(JSON.stringify(results, null, 2));

    } catch (error) {
        console.error('Terjadi kesalahan saat melakukan scraping:', error);
}
}

//buat input
rl.question('Masukkan npm mahasiswa: ', (inputNpm) => {
    scrapeData(inputNpm).then(() => {
        rl.close(); 
    });
});
