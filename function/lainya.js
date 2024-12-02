const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
creator = 'NeedCuan x NeedMaster'

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

async function webtoon(search) {
    return new Promise((resolve , reject) => {
    axios.get(
    `https://www.webtoons.com/id/search?keyword=${search}`,
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0'
        }
    }).then(data => {
    const $ = cheerio.load(data.data);   
    const tt = []
    const auth = []
    const stat = []
    const weblink = 'https://www.webtoons.com'
    $('.challenge_lst.search > ul > li > a > p.subj').get().map((rest) => {
        tt.push($(rest).text())
    })
    $('.challenge_lst.search > ul > li > a > p.author').get().map((rest) => {
        auth.push($(rest).text())
    })
    $('.challenge_lst.search > ul > li > a').get().map((rest) => {
        stat.push(weblink + $(rest).attr('href'))
    })
    let result = []
        for (let i = 0; i < tt.length; i++) {
            result.push({
                Judul: tt[i],
                Author: auth[i],
                Stat: stat[i]
            })
        }
    resolve({ status: 200, creator: 'NoobUser', result })
    })
    .catch(reject)
})
}

async function webtoondt(link) {
    return new Promise((resolve, reject) => {
        axios.get(
            `${link}`,
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
        }
    }).then(data => {
    const $ = cheerio.load(data.data);
    //const results = []
    const title = []
    const date = []
    const like = []
    const eps = []
    const page = []
    const grade = []
    const lunkton = []
    const linm = `https://www.webtoons.com`
    $('ul#_listUl > li._episodeItem > a > span.subj').get().map((rest) => {
        title.push($(rest).text())
    })
    $('ul#_listUl > li._episodeItem > a > span.date').get().map((rest) => {
        date.push($(rest).text().replace("\n\t\t\t\t\t\t\t\t", "").replace("\n\t\t\t\t\t\t\t\t", ""))
    })
    $('ul#_listUl > li._episodeItem > a > span.like_area._likeitArea').get().map((rest) => {
        like.push($(rest).text().replace("\n\t\t\t\t\t\t\t\t", "").replace("\n\t\t\t\t\t\t\t\t", ""))
    })
    $('ul#_listUl > li._episodeItem > a > span.tx').get().map((rest) => {
        eps.push($(rest).text().replace("\n\t\t\t\t\t\t\t\t", "").replace("\n\t\t\t\t\t\t\t\t", ""))
    })
    $('div.paginate > a').get().map((rest) => {
        page.push(linm + $(rest).attr('href').replace("\n\t\t\t\t\t\t\t\t", "").replace("\n\t\t\t\t\t\t\t\t", ""))
    })
    $('li._episodeItem > a').get().map((rest) => {
        lunkton.push($(rest).attr('href').replace("\n\t\t\t\t\t\t\t\t", "").replace("\n\t\t\t\t\t\t\t\t", ""))
    })
    let result = []
    result.Pages = page
        for (let i = 0; i < title.length; i++) {
            result.push({
                Judul: title[i],
                Upload_Release: date[i],
                Episode: eps[i],
                Like: like[i],
                Link_View: lunkton[i]
            })
        }
    resolve({ status: 200, creator: 'NoobUser', result });
})
.catch(reject);
})
}

async function cariresep(query) {
    return new Promise(async (resolve, reject) => {
		axios.get('https://resepkoki.id/?s=' + query)
			.then(({
				data
			}) => {
                const $ = cheerio.load(data)
				const link = [];
				const judul = [];
				const upload_date = [];
				const format = [];
				const thumb = [];
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
					jud = $(d).text();
					judul.push(jud)
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: judul[i],
						link: link[i]
					})
				}
				const result = {
					creator: `${creator}`,
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

async function bacaresep(query) {
    return new Promise(async (resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const abahan = [];
				const atakaran = [];
				const atahap = [];
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
					bh = $(b).text();
					abahan.push(bh)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
					uk = $(d).text();
					atakaran.push(uk)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
					th = $(f).text();
					atahap.push(th)
				})
				const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
				const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
				const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
				const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
				const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
				tbahan = 'bahan\n'
				for (let i = 0; i < abahan.length; i++) {
					tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
				}
				ttahap = 'tahap\n'
				for (let i = 0; i < atahap.length; i++) {
					ttahap += atahap[i] + '\n\n'
				}
				const tahap = ttahap
				const bahan = tbahan
				const result = {
					creator: 'Fajar Ihsana',
					data: {
						judul: judul,
						waktu_masak: waktu,
						hasil: hasil,
						tingkat_kesulitan: level,
						thumb: thumb,
						bahan: bahan.split('bahan\n')[1],
						langkah_langkah: tahap.split('tahap\n')[1]
					}
				}
				resolve(result)
			})
			.catch(reject)
	})
}

async function whois(domain = 'google.com') {
  return new Promise((resolve, reject) => {
    var options = { 
      method: 'POST',
      url: 'https://www.hostinger.co.id/whois',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { 
        domain: `${domain}`, 
        submit: 'search' 
      }
    };

    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      resolve({
        result: result["domain"]
      });
    });
  });
}

async function gempa() {
    return new Promise((resolve, reject) => {
        axios.get(
            'https://www.bmkg.go.id/',
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
        }
    }).then(data => {
    const results = {};
    const $ = cheerio.load(data.data);
    var gem = findAll($, '.list-unstyled li')
    var map = $('.row > div > a > img').attr('src')
    const result = {
        Waktu: gem[0],
        Magnitude: gem[1],
        Kedalaman: gem[2],
        Lokasi: gem[3],
        Wilayah: gem[4],
        Dirasakan: gem[5],
        Map_Image: map
    }
    resolve({ status: 200, creator: 'NoobUser', result });
})
.catch(reject);
})
}

async function covid(country) {
    if (!country) return loghandler.noinput;
	try {
		const res = await axios.request(`https://www.worldometers.info/coronavirus/country/` + country, {
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
			}
		});
		let result = {};
		const $ = cheerio.load(res.data);
		result.status = res.status
		result.negara = $("div").find("h1").text().slice(3).split(/ /g)[0];
		result.total_kasus = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(0).text() + " total";
		result.total_kematian = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(1).text() + " total";
		result.total_sembuh = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(2).text() + " total";
		result.informasi = $("div.content-inner > div").eq(1).text();
		result.informasi_lengkap = "https://www.worldometers.info/coronavirus/country/" + country;
		if (result.negara == '') {
			result.status = 'error'
		}
		return result;
	} catch (error404) {
		return "=> Error => " + error404;
	}
}

async function ssticker(nama) {
    return new Promise((resolve, reject) => {
        axios.get('https://getstickerpack.com/stickers?query='+nama).then(res => {
            const $ = cheerio.load(res.data)
            const result = []
            const main = $('#stickerPacks > div > div:nth-child(3) > div > a')

            main.each( function() {
                const url = $(this).attr('href')
                const title = $(this).find('div > span').text()
                result.push({ title, url })
            })
            resolve({status: 200, Creator: 'NoobUser', result})
        }).catch(reject)
    })
}

async function stickerDl(link) {
     return new Promise((resolve, reject) => {
          axios.get(`${link}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let name = []
                    let thumb = []
                    $('.row > div > img').get().map((rest) => {
                         name.push($(rest).attr('src'))
                    })
                    let result = []
                    for (let i = 0; i < name.length; i++) {
                         result.push({
                            Link_Download: name[i]
                         })
                    }
                    resolve({
                        result: result
                    })
               }).catch(reject)
     })
}

function random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strong() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz`~!@#$%^&*()_+=";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function memorable() {
    var string = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz";
    var ranInt = random(0,string.length - 1);
    return string[ranInt];
}

function strongPass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? strong() : rx;
        }
    }
    return ranPass;
}

function memorablePass(x){
    var ranPass = "";
    if(x != null){
        for(var i=0; i < x.length; i++){
            var rx = x[i];
            ranPass += rx == "x" ? memorable() : rx;
        }
    }
    return ranPass;
}

function genPassword() {
    return new Promise((resolve, reject) => {
        const low = memorablePass("xxxxxxxx")
        const medium = memorablePass("xxxxxxxxxxxx")
        const strong = strongPass("xxxxxxxxxxxxxxxx")
        const verStrong = strongPass("xxxxxxxxxxxxxxxxxxxxxxxx")
        const res = {
            low: low,
            medium: medium,
            strong: strong,
            verStrong: verStrong
        }
        resolve(res)
    })
}

module.exports = {
  whois,
  genPassword,
  gempa,
  ssticker,
  stickerDl,
  webtoon,
  webtoondt,
  cariresep,
  bacaresep,
  covid
};