const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
creator = `NeedCuan x NeedMaster👑`
Note = `Jangan di tembak bang mending bisnis bareng aja hehe 💀`

async function jadwaltv(namachan) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.jadwaltv.net/channel/${namachan}`)
    .then(data => {
        const $ = cheerio.load(data.data);
        let amu = []
        $('tr.jklIv').get().map((rest) => {
            amu.push($(rest).text().replace("WIB", "WIB\nACARA : ").replace("", "Jam : ").replace("WIB", " WIB"))
        })
        resolve(amu)
        })
        .catch(reject);
    });
};

module.exports = {
  jadwaltv
}