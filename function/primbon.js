const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");

async function artiMimpi(mimpi) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const cek = $("#body > font > i").text();
        const adaga = /Tidak ditemukan/g.test(cek) ? false : true;
        if (adaga) {
          const isi = $("#body")
            .text()
            .split(`Hasil pencarian untuk kata kunci: ${mimpi}`)[1]
            .replace(/\n\n\n\n\n\n\n\n\n/gi, "\n");
          const result = {
            result: isi.replace(/\n/gi, "").replace("       ", "").replace("\"        ", "")
          };
          resolve(result);
        } else {
          const result = {
            result: `Arti mimpi ${mimpi} tidak di temukan`
          };
          resolve(result);
        }
      })
      .catch(reject);
  });
};

async function artiNama(nama) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const isi = $("#body").text().split("Nama:")[0];
        const result = {
          result: isi.replace(/\n/gi, "").replace("ARTI NAMA", "").replace("                                ", "")
        };
        resolve(result);
      })
      .catch(reject);
  });
};

async function ramalJodoh(nama1, nama2) {
  return new Promise((resolve, reject) => {
    axios
    .get(`https://www.primbon.com/kecocokan_nama_pasangan.php?nama1=${nama1}&nama2=${nama2}&proses=+Submit%21+`)
    .then(({ data }) => {
     const $ = cheerio.load(data);
     const thumbnail = 'https://www.primbon.com/'+$('#body > img').attr('src');
     const res = $('#body').text().split(nama2)[1].replace('< Hitung Kembali','').split('\n')[0];
     const positif = res.split('Sisi Negatif Anda: ')[0].replace('Sisi Positif Anda: ','')
     const negatif = res.split('Sisi Negatif Anda: ')[1]
     const result = {
          namaKamu: nama1,
          namaPasangan: nama2,
          thumbnail: thumbnail,
          positif: positif,
          negatif: negatif
     }
     resolve(result);
    })
    .catch(reject);
  });
};

async function nomorHoki(nomor) {
  return new Promise((resolve, reject) => {
    var options = { method: 'POST',
      url: 'https://primbon.com/no_hoki_bagua_shuzi.php',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: { nomer: nomor, submit: ' Submit! ' } };

      request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      const result = $('#body').text().split('POTENSI HOKI')[1].replace('\n\n\n\n  \n    \nMasukkan Nomor HP Anda\n    \n  \n  \n    \n\n    \n    \n\n    \n  \n\n\n\n\nMeningkatkan Keberuntungan Melalui Nomor Handphone (HP)\nNomor HP adalah gabungan kombinasi angka-angka yang sebenarnya memiliki arti, ada yang membawa pengaruh baik (hoki), biasa, atau bahkan dianggap kurang baik. Sebuah nomor HP bisa saja dianggap cantik, dijual sampai jutaan, bahkan puluhan juta rupiah, namun nomor tersebut belum tentu hoki. Aplikasi ini dibuat untuk mengecek seberapa jauh pengaruh energi suatu deret nomor HP berdasarkan algoritma Bagua Shuzi, yaitu metode China kuno yang sudah berusia ribuan tahun yang bertujuan untuk mengejar keberuntungan melalui pemilihan angka.\n\nBagua Shuzi menjelaskan pengaruh kombinasi angka yang berupa energi Kekayaan (Sheng Qi), Kesehatan (Tian Yi), Cinta/Relasi (Yan Nian), dan Kelancaran/Kestabilan (Fu Wei), sebagai energi positif. Sedangkan energi Perselisihan (Huo Hai), Kehilangan (Liu Sha), Malapetaka (Wu Gui), dan Kehancuran (Jue Ming), sebagai energi negatif. Sebuah nomor dikatakan baik atau hoki jika persentase energi positifnya lebih banyak dibanding energi negatifnya. Karena metode Bagua Shuzi menggunakan algoritma perhitungan yang cukup kompleks, maka tidak heran jika nomor hoki jumlahnya lebih terbatas dibanding nomor cantik.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    \n    ', '')
      resolve({
        result: 'POTENSI HOKI'+result
      });
    });

  })
}

async function katakesedihan() {
     return new Promise((resolve, reject) => {
          axios.get(`https://jagokata.com/kata-bijak/kata-kesedihan.html`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let isi = []
                    $('q.fbquote').get().map((rest) => {
                        isi.push($(rest).text())
                    })
                    let result = []
                    for (let i = 0; i < isi.length; i++) {
                    result.push({
                                Isi: isi[i]
                                })
                             }
                    resolve({
                        result: result
                    })
               }).catch(reject)
     })
}

async function katacinta() {
     return new Promise((resolve, reject) => {
          axios.get(`https://jagokata.com/kata-bijak/kata-cinta.html`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let isi = []
                    $('q.fbquote').get().map((rest) => {
                        isi.push($(rest).text())
                    })
                    let result = []
                    for (let i = 0; i < isi.length; i++) {
                    result.push({
                                Isi: isi[i]
                                })
                             }
                    resolve({
                        result: result
                    })
               }).catch(reject)
     })
}

module.exports = {
  artiNama,
  artiMimpi,
  ramalJodoh,
  nomorHoki,
  katakesedihan,
  katacinta
};