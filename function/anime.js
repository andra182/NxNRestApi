const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");

async function anime() {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.waifu.pics/sfw/waifu`).json()
    result = res['url']
    resolve(result)
    .catch(reject);
  });
};

module.exports = {
  anime
};