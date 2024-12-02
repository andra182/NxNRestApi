const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
const { reject } = require("lodash");
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

async function grupwa(nama) {
    return new Promise((resolve,reject) => {
        axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
        .then(({ data }) => {
            const $ = cheerio.load(data);
            const result = [];
            const lnk = [];
            const nm = [];
        $('div.wa-chat-title-container').each(function(a,b){
            const limk = $(b).find('a').attr('href');
            lnk.push(limk)
            })
        $('div.wa-chat-title-text').each(function(c,d) {
            const name = $(d).text();
            nm.push(name)
            })
        for( let i = 0; i < lnk.length; i++){
            result.push({
                nama: nm[i].split('. ')[1],
                link: lnk[i].split('?')[0]
            })
        }
        resolve({ status: 200, creator: `${creator}`, note: `${note}`, result })
        })
    .catch(reject)
    })
}

async function mediafdl(link) {
    return new Promise((resolve, reject) => {
        axios.get(
            `${link}`,
    {
        headers: {
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
        }
    }).then(data => {
    const $ = cheerio.load(data.data);
    var name = findAll($, '.filename')
    var file = findAll($, '.filetype')
    var fs = findAll($, '.details li')
    var upload = findAll($, '.details li')
    var fn = findAll($, '.DLExtraInfo-sectionDetails p')
    var fd = $('#downloadButton').attr('href')
    const result = {
        Name: name[0],
        File_Type: file[0],
        KedaFile_Sizelaman: fs[0],
        Upload_Date: upload[1],
        Info_Upload: fn[0],
        Download_Link: fd
    }
    resolve({ status: 200, creator: `${creator}`, note: `${note}`, result });
})
.catch(reject);
})
}

async function trendtwit(country) {
	return new Promise((resolve, reject) => {
		axios.get(`https://getdaytrends.com/${country}/`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hastag = [];
				const tweet = [];
				const result = [];
				$('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr> td.main > a').each(function(a, b) {
					deta = $(b).text()
					hastag.push(deta)
				})
				$('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr > td.main > div > span').each(function(a, b) {
					deta = $(b).text()
					tweet.push(deta)
				})
				num = 1
				for (let i = 0; i < hastag.length; i++) {
					result.push({
						rank: num,
						hastag: hastag[i],
						tweet: tweet[i]
					})
					num += 1
				}
				resolve({
					country: country,
					result: result
				})
			})
			.catch(reject)
	})
}

async function ghuser(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://github.com/search?q=' + query + '&type=users')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const username = [];
				const link = [];
				const result = [];
				const thumb = [];
				$('#user_search_results > div > div > div.flex-auto > div > div.f4.text-normal > a.mr-1').each(function(a, b) {
					link.push('https://github.com/' + $(b).attr('href'))
					usr = $(b).text();
					username.push(usr)
				})
				$('#user_search_results > div > div > div.flex-shrink-0.mr-2 > a > img').each(function(c, d) {
					thumb.push($(d).attr('src').replace('s=40&', ''))
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						name: username[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}

async function wattpad(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.wattpad.com/search/' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				const linkk = [];
				const judull = [];
				const thumb = [];
				const dibaca = [];
				const vote = [];
				const bab = [];
				$('ul.list-group > li.list-group-item').each(function(a, b) {
					linkk.push('https://www.wattpad.com' + $(b).find('a').attr('href'))
					thumb.push($(b).find('img').attr('src'))
				})
				$('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(1) > div.icon-container > div > span.stats-value').each(function(e, f) {
					baca = $(f).text();
					dibaca.push(baca)
				})
				$('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(2) > div.icon-container > div > span.stats-value').each(function(g, h) {
					vot = $(h).text();
					vote.push(vot)
				})
				$('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(3) > div.icon-container > div > span.stats-value').each(function(i, j) {
					bb = $(j).text();
					bab.push(bb)
				})
				$('div.story-card-data.hidden-xxs > div.story-info > div.title').each(function(c, d) {
					titel = $(d).text();
					judull.push(titel)
				})
				for (let i = 0; i < linkk.length; i++) {
					if (!judull[i] == '') {
						result.push({
							judul: judull[i],
							dibaca: dibaca[i],
							divote: vote[i],
							thumb: thumb[i],
							link: linkk[i]
						})
					}
				}
				resolve({status: 200, creator: `${global.creator}`,note: `${global.note}`, result})
			})
			.catch(reject)
	})
}

module.exports = {
    grupwa,
    mediafdl,
    trendtwit,
    ghuser,
    wattpad
}