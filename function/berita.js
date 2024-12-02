const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
creator = `NeedCuan x NeedMaster`
note = `Mau bisnis bareng? atau mau reseller api ini? tenang bisa chat salah satu admin kami, ada paket reseller + harga murah dari user normal`

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

async function merdeka() {
return new Promise((resolve, reject) => {
      axios.get('https://www.merdeka.com/peristiwa/')
          .then(({
              data
          }) => {
              const $ = cheerio.load(data)
              const judul = [];
              const upload = [];
              const link = [];
              const thumb = [];
              const result = [];
              $('#mdk-content-center > div.inner-content > ul > li > div').each(function(a, b) {
                  deta = $(b).find('h3 > a').text();
                  judul.push(deta)
                  link.push('https://www.merdeka.com' + $(b).find('h3 > a').attr('href'))
                  upload.push($(b).find('div > span').text())
                  thumb.push($(b).find('div > a > img').attr('src'))
              })
              for (let i = 0; i < judul.length; i++) {
                  result.push({
                      judul: judul[i],
                      upload_date: upload[i],
                      link: link[i],
                      thumb: thumb[i]
                  })
              }
              resolve({ status: 200, creator: `${creator}`, note: `${note}`, result })
          })
          .catch(reject)
  })
}

async function kompasTerkini() {
  return new Promise((resolve, reject) => {
    axios.get('https://kompas.com')
.then((respon) => {
        const r = respon.data
        const $ = cheerio.load(r)
        const result = []
        $('.latest .article__list').each(function(i, elem){
            result[i] = {
                judul: $(this).find('a').text().trim(),
                url: $(this).find('a').attr('href'),
                date: $(this).find(".article__date").text()
            }
        })
        resolve({ status: 200, creator: `${creator}`, note: `${note}`, result })
        .catch(reject);
})
    
    
  });
};

module.exports = {
    kompasTerkini,
    merdeka
};
