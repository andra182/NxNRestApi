const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");

function findAll(loader, selector, find = null, response) {
    var results = []
    if (find) {
        loader(selector).find(find).each(function (index, element) {
            //list.push($(element).attr('href'));
            response === 'html' ? results.push(loader(element).html()) : results.push(loader(element).text()); 
        });
    } else {
        loader(selector).each(function (index, element) {
            //list.push($(element).attr('href'));
            response === 'html' ? results.push(loader(element).html()) : results.push(loader(element).text());
        });
    }
    return results
}

async function umrotik(daerah) {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://umrotix.com/jadwal-sholat/${daerah}`,
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
        }
    }).then(data => {
    const results = {};
    const $ = cheerio.load(data.data);
    var name = $('div.container > h1').text()
    var tabel = findAll($, '.row')
    const result = {
        Title: name,
        Waktu: tabel[2].replace("    ", "").replace("  ", "\n").replace("  ", "\n").replace("  ", "\n").replace("  ", "\n").replace("  ", "\n")
    }
    resolve({ status: 200, creator: 'NoobUser', result });
})
.catch(reject);
})
}

async function alkitabharian() {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://alkitab.mobi/renungan/sh/`,
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
        }
    }).then(data => {
    const results = {};
    const $ = cheerio.load(data.data);
    var name = findAll($, 'div p')
    const result = {
        Title: name
    }
    resolve({ status: 200, creator: 'NoobUser', result });
})
.catch(reject);
})
}


module.exports = {
	umrotik,
	alkitabharian
}