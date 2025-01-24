const axios = require('axios');
const cheerio = require('cheerio');

const fetchJadwalUTS = async () => {
    try {
        const url = `https://baak.gunadarma.ac.id/jadwal/cariUtama?jurusan=S1-SISTEM+INFORMASI+%28KAMPUS+KELAPA+DUA%29`;

        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const headers = [];
        $('table tr th').each((_, th) => {
            headers.push($(th).text().trim().toLowerCase().replace(/\s+/g, '_')); // Format header ke snake_case
        });

        const rows = [];
        $('table tr').each((_, tr) => {
            const row = {};
            $(tr)
                .find('td')
                .each((index, td) => {
                    row[headers[index]] = $(td).text().trim();
                });

            if (Object.keys(row).length > 0) {
                rows.push(row);
            }
        });

        const uniqueRows = rows.filter(
            (value, index, self) =>
                index ===
                self.findIndex(
                    (t) =>
                        t.hari === value.hari &&
                        t.tanggal === value.tanggal &&
                        t.mata_kuliah === value.mata_kuliah &&
                        t.waktu === value.waktu &&
                        t.ruang === value.ruang
                )
        );

        if (uniqueRows.length === 0) {
            console.log('Tidak ada data ditemukan.');
        } else {
            console.log('Hasil JSON:', JSON.stringify(uniqueRows, null, 2));
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Directly call the function
fetchJadwalUTS();
