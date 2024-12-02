const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs")
const fetch = require("node-fetch")

async function photooxy(url, text) {
    if (!/^https:\/\/photooxy\.com\/.+\.html$/.test(url))
        throw new Error("Invalid URL");
    let nomor = 0;
    const form = new FormData();
    if (typeof text === "string") text = [text];
    for (let texts of text) {
        nomor += 1;
        form.append(`text_${nomor}`, texts);
    }
    form.append("login", "OK");
    let cari = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "/",
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "GoogleBot",
            ...form.getHeaders(),
        },
        body: form.getBuffer(),
    });
    let html = await cari.text();
    let $ = cheerio.load(html);
    const hasil = $('a[class="btn btn-primary"]').attr("href");
    return hasil;
}

async function textvidmaker(style, text1) {
    if (style == 'poly') {
        var tstyle = 0
    } else if (style == 'bold') {
        var tstyle = 1
    } else if (style == 'glowing') {
        var tstyle = 2
    } else if (style == 'colorful') {
        var tstyle = 3
    } else if (style == 'army') {
        var tstyle = 4
    } else if (style == 'retro') {
        var tstyle = 5
    }
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: "https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                optionNumber_0: tstyle,
                text_1: text1,
                login: 'OK'
            }
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error);
            const $ = cheerio.load(body)
            const result = {
                url: $('video#my-video source').attr('src')
            }
            resolve(result);
        });
    })
}

module.exports = {
  photooxy,
  textvidmaker
};