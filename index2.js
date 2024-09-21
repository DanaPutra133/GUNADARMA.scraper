// const axios = require('axios');
// const cheerio = require('cheerio');

// // Define the input for ${kelas}
// const kelas = '1ka11'; // Replace with the actual class input

// // Construct the URL with the input
// const url = `https://baak.gunadarma.ac.id/cariMhsBaru?_token=l42EnRlgByQHUQGmXlNnns4jZW4nW18gL0rRIGd3&tipeMhsBaru=Kelas&teks=${kelas}`;

// async function scrapeTable() {
//     try {
//         // Send a GET request to the URL
//         const response = await axios.get(url);
        
//         // Load the HTML response into cheerio
//         const $ = cheerio.load(response.data);
        
//         // Find the desired table
//         const table = $('.table.table-custom.table-primary.table-fixed.bordered-table.stacktable.small-only');

//         // Check if the table is found
//         if (table.length > 0) {
//             console.log(table.html()); // Print the HTML of the table
//         } else {
//             console.log('Table not found.');
//         }
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// }

// // Call the function
// scrapeTable();



// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeData(kelas) {
//     const url = `https://baak.gunadarma.ac.id/cariMhsBaru?_token=l42EnRlgByQHUQGmXlNnns4jZW4nW18gL0rRIGd3&tipeMhsBaru=Kelas&teks=${kelas}`;

//     try {
//         // Melakukan permintaan GET
//         const response = await axios.get(url);
//         const html = response.data;

//         // Memuat HTML ke cheerio
//         const $ = cheerio.load(html);
//         const tbody = $('tbody').html(); // Mengambil HTML dari <tbody>

//         console.log(tbody); // Menampilkan hasil

//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// // Ganti 'Kelas' dengan kelas yang ingin Anda masukkan
// const kelas = '1ka11'; 
// scrapeData(kelas);


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
                
                console.log(data); // Menampilkan data siswa
            }
        });

    } catch (error) {
        console.error('masukan nama:', error);
    }
}

// Meminta input dari pengguna
rl.question('Masukkan nama: ', (inputNama) => {
    scrapeData(inputNama).then(() => {
        rl.close(); // Menutup interface readline setelah selesai
    });
});