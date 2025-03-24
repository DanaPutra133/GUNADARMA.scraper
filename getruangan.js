const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://baak.gunadarma.ac.id/jadwal/cariJadKul?_token=MMVYI8xKufDSvTKRFCnhbcr4KNSjzssaw1qSDt0g&teks=';
const TARGET_RUANG = 'E222'; 
const HARI_URUTAN = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];

const tingkatList = ['1', '2', '3', '4'];
const fakultasList = ['KA', 'KB', 'IA', 'IB', 'IC', 'ID', 'EA', 'EB', 'TA', 'TB', 'PA', 'SA'];
const kelasParalel = Array.from({ length: 50 }, (_, i) => String(i + 1).padStart(2, '0'));

const allKelas = [];
for (let tingkat of tingkatList) {
    for (let fakultas of fakultasList) {
        for (let kelas of kelasParalel) {
            allKelas.push(`${tingkat}${fakultas}${kelas}`);
        }
    }
}

async function scrapeData(kelas) {
    try {
        const response = await axios.get(BASE_URL + kelas);
        const html = response.data;
        const $ = cheerio.load(html);
        const rows = $('tbody tr');
        const results = [];

        rows.each((_, row) => {
            const tds = $(row).find('td');
            if (tds.length > 0) {
                const ruang = $(tds[4]).text().trim();
                if (ruang === TARGET_RUANG) {
                    results.push({
                        kelas: $(tds[0]).text(),
                        hari: $(tds[1]).text(),
                        mata_kuliah: $(tds[2]).text().trim(),
                        jam: $(tds[3]).text().trim().split('/').map(Number),
                        dosen: $(tds[5]).text().trim(),
                    });
                }
            }
        });

        return results;
    } catch (error) {
        console.error(`Error fetching data for ${kelas}:`, error.message);
        return [];
    }
}

async function fetchAllClasses() {
    const finalResult = {};

    for (let kelas of allKelas) {
        console.log(`Fetching data for: ${kelas}`);
        const data = await scrapeData(kelas);
        for (let entry of data) {
            if (!finalResult[entry.hari]) {
                finalResult[entry.hari] = [];
            }
            
            // Pastikan tidak ada duplikasi
            const existing = finalResult[entry.hari].find(e => e.kelas === entry.kelas && JSON.stringify(e.jam) === JSON.stringify(entry.jam));
            if (!existing) {
                finalResult[entry.hari].push({
                    kelas: entry.kelas,
                    jam: entry.jam.sort((a, b) => a - b), // Urutkan jam terkecil ke terbesar
                });
            }
        }
    }

    // Urutkan berdasarkan hari yang benar
    const sortedResult = Object.fromEntries(
        Object.entries(finalResult).sort((a, b) => HARI_URUTAN.indexOf(a[0]) - HARI_URUTAN.indexOf(b[0]))
    );

    console.log(JSON.stringify(sortedResult, null, 2));
}

fetchAllClasses();
