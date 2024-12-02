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

async function gtwiki(fandomfinder) {
    return new Promise((resolve, reject) => {
         axios.get(`https://growtopia.fandom.com/wiki/Special:Search?query=${fandomfinder}&scope=internal&navigationSearch=true&serp_test=1&so=trending`)
              .then(({ data }) => {
                   const $ = cheerio.load(data)
                   let name = []
                   let desc = []
                   let url = []
                   $('h3.unified-search__result__header > a').get().map((rest) => {
                        name.push($(rest).attr('data-title'))
                   })
                   $('div.unified-search__result__content').get().map((rest) => {
                       desc.push($(rest).text().replace(/\n/gi, "").replace("                ", "").replace("            ", ""))
                   })
                   $('div > a.unified-search__result__link').get().map((rest) => {
                       url.push($(rest).text().replace(/\n/gi, "").replace("                    ", ""))
                   })
                   let result = []
                   for (let i = 0; i < name.length; i++) {
                        result.push({
                             title: name[i],
                             desc: desc[i],
                             url: url[i]
                        })
                   }
                   resolve({
                       result: result
                   })
              }).catch(reject)
    })
}

async function gtwikidetail(itemnya) {
   return new Promise((resolve, reject) => {
axios.get(
   `https://growtopia.fandom.com/wiki/${itemnya}`,
   {
       headers: {
           'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0'
       }
   }).then(data => {
   const results = {};
   const $ = cheerio.load(data.data);
   results.judul = $('#firstHeading').text().replaceAll('\t', '').replaceAll('\n', '');
   var card_text = findAll($, '.card-text');
   results.deskripsi = card_text[0];
   var card_title = findAll($, '.card-title', null, 'text');
   results[card_title[0].toLowerCase()] = card_text[1]
   var card_field_th = findAll($, '.card-field tbody', 'tr > th', 'html');
   var card_field_td = [];
   var data = [];
   results[card_title[1].toLowerCase()] = data;
   $('.card-field tbody > tr > td').each(function (index, element) {
       card_field_td.push($(element).text());
   });
   for (var i = 0; i < card_field_th.length; i++){
       var xx = card_field_th[i].toLowerCase().replaceAll(' ', '_');
       var dct = {}
       dct[xx] = card_field_td[i]
       data.push(dct)
   }
   var recipebox = findAll($, '.recipebox');
   if (recipebox === undefined){results.Additional_Info = null}else{
       results.Additional_Info = recipebox[0].replaceAll('\t', '').replaceAll('\n', '');
   }
       resolve({
          result: results
       })
   })
   .catch(reject)
    })
}

module.exports = {
    gtwiki,
    gtwikidetail
}