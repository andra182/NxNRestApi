const axios = require("axios");
const cheerio = require("cheerio");

async function ansearchApk(apkname) {
     return new Promise((resolve, reject) => {
          //axios.get(`https://an1.co.in/?s=${apkname}`)
          axios.get(`https://an1.com/?story=${apkname}&do=search&subaction=search`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let name = []
                    let url = []
                    let url_download = []
                    let thumb = []
                    let desc = []
                    $('div.name > a').get().map((rest) => {
                         name.push($(rest).text())
                    })
                    $('div.img > img').get().map((rest) => {
                         thumb.push($(rest).attr('src'))
                    })
                    $('div.name > a').get().map((rest) => {
                         url.push($(rest).attr('href'))
                    })
                    $('div.spoiler > b').get().map((rest) => {
                         desc.push($(rest).text())
                    })
                    let result = []
                    for (let i = 0; i < name.length; i++) {
                         result.push({
                              title: name[i],
                              thumb: thumb[i],
                              url: url[i],
                              desc: desc[i]
                         })
                    }
                    resolve({
                        result: result
                    })
               }).catch(reject)
     })
}


module.exports = {
  ansearchApk
};