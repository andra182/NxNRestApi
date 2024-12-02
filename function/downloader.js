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

async function igdls(link) {
    return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: "https://downloadgram.org/#downloadhere",
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			formData: {
				url: link,
				submit: ''
			}
		};
		request(options, async function(error, response, body) {
			if (error) throw new Error(error);
			const $ = cheerio.load(body)
			const result = [];
			$('#downloadBox > a').each(function(a, b) {
				result.push($(b).attr('href'))
			})
			resolve(result);
		});
	})
}

module.exports = {
igdls
}