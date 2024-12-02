dir = process.cwd();
let express = require("express");
let axios = require("axios");
let creator = `NeedCuan x NeedMaster`;
let note = `Mau bisnis bareng? atau mau reseller api ini? tenang bisa chat salah satu admin kami, ada paket reseller + harga murah dari user normal`;
let cheerio = require("cheerio");
let formData = require("form-data");
let fetch = require("node-fetch");
const schedule = require("node-schedule");
let fs = require("fs");
let request = require("request");
var data = fs.readFileSync("./database/db.json");
var dataP = JSON.parse(data);
let router = express.Router();
let options = require(dir + "/lib/options.js");
let { color, bgcolor } = require(dir + "/lib/color.js");
let { getBuffer, fetchJson } = require(dir + "/lib/fetcher.js");
const brainly = require("brainly-scraper");
_ = require("lodash");

loghandler = {
  noturl: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    code: 406,
    message: "Masukan URL",
  },
  notquery: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    code: 406,
    message: "Masukkan query",
  },
  notapikey: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    code: 403,
    message: "Masukkan Apikey",
  },
  apikeyfalse: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    code: 403,
    message: "Apikey salah. Silahkan membeli apikey di menu!",
  },
  apikeylimit: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    code: 403,
    message:
      "Apikey anda terkena limit! Silahkan tunggu hingga limit apikey anda ter-reset pukul 06.00 waktu server!",
  },
  error: {
    status: false,
    creator: `${creator}`,
    note: `${note}`,
    message:
      "An internal error occurred. Please report via WhatsApp wa.me/6288286421519",
  },
};

function addReq() {
  Object.keys(dataP).forEach((i) => {
    dataP[i].totalreq += 1;
    fs.writeFileSync("./database/db.json", JSON.stringify(dataP, null, 2));
  });
}
function status(key) {
  var found = false;
  Object.keys(dataP).forEach((i) => {
    if (dataP[i].apikey == key) {
      found = i;
    }
  });
  if (found !== false) {
    if (dataP[found].status == "guest") {
      bts = "Guest";
    }
    if (dataP[found].status == "premium") {
      bts = "Premium";
    }
    if (dataP[found].status == "vip") {
      bts = "V.I.P";
    }
    if (dataP[found].status == "max") {
      bts = "Max";
    }
    output = {
      status: bts,
      limit: dataP[found].limit,
      batas: batasLimit(key),
    };
    return output;
  }
}

//id yang dimaksud disini adalah nama "user", nanti bisa diganti tergantung ngesave dengan cara apa
function batasLimit(key) {
  var found = false;
  Object.keys(dataP).forEach((i) => {
    if (dataP[i].apikey == key) {
      found = i;
    }
  });
  if (found !== false) {
    if (dataP[found].status == "guest") {
      bts = 20;
    }
    if (dataP[found].status == "premium") {
      bts = 1000;
    }
    if (dataP[found].status == "vip") {
      bts = Infinity;
    }
    if (dataP[found].status == "max") {
      bts = Infinity;
    }
    return bts;
  }
}

function listkey(key) {
  var found = false;
  Object.keys(dataP).forEach((i) => {
    if (dataP[i].apikey == key) {
      found = i;
    }
  });
  if (found !== false) {
    return true;
  } else {
    return false;
  }
}

function isLimit(key, req, res) {
  var found = false;
  Object.keys(dataP).forEach((i) => {
    if (dataP[i].apikey == key) {
      found = i;
    }
  });
  let limits = dataP[found].limit;
  if (limits >= batasLimit(dataP[found].apikey)) {
    found = true;
    //nih buat misal ngasih tau orang kalau limitnya abis, karna gw gatau ituinnya, gw tulis di console log, lu bisa ubah sendiri
    //console.log(`Limit APIKEY anda habis, Silahkan upgrade status anda atau menunggu Limit Reset setiap pukul 06.00 waktu server`)
    return true;
  } else {
    dataP;
    found = true;
    return false;
  }
}

//limitAdd bisa dipake di akhir case, tulis aja limitAdd(usernya)
function limitAdd(key) {
  var found = false;
  Object.keys(dataP).forEach((i) => {
    if (dataP[i].apikey == key) {
      found = i;
    }
  });
  if (found !== false) {
    dataP[found].limit += 1;
    fs.writeFileSync("./database/db.json", JSON.stringify(dataP, null, 2));
  }
}

function limitReset() {
  dataP.map((v, i) => {
    dataP[i].limit = 0;
  });
  fs.writeFileSync("./database/db.json", JSON.stringify(dataP, null, 2));
}

//limit reset setiap pagi jam 6 waktu server, untuk example nya ada di npmjs nya node schedule
schedule.scheduleJob("6 * * *", function () {
  limitReset();
  console.log("Limit Reset Succes");
});
const {
  whois,
  genPassword,
  gempa,
  ssticker,
  stickerDl,
  webtoon,
  webtoondt,
  pinterest,
  cariresep,
  bacaresep,
  covid,
} = require(dir + "/function/lainya");
const { anime } = require(dir + "/function/anime");
const { textvidmaker } = require(dir + "/function/photooxy");
const { grupwa, mediafdl, trendtwit, ghuser, wattpad } = require(dir +
  "/function/medsos");
const { gtwiki, gtwikidetail } = require(dir + "/function/game");
const { igStalk, igDownload } = require(dir + "/function/ig");
const { getApk, searchApk } = require(dir + "/function/rexdl");
const { ansearchApk } = require(dir + "/function/an1");
const {
  artiNama,
  artiMimpi,
  ramalJodoh,
  nomorHoki,
  tanggalJadian,
  katakesedihan,
  katacinta,
} = require(dir + "/function/primbon");
const { yDonlod, yPlay, ySearch } = require(dir + "/function/yt");
const { umrotik, alkitabharian } = require(dir + "/function/util");
const { merdeka, kompasTerkini } = require(dir + "/function/berita.js");
const { jadwaltv } = require(dir + "/function/jadwaltv");
const { igdls } = require(dir + "/function/downloader");

router.get("/textvidmaker", async (req, res) => {
  const text1 = req.query.text1;
  const style = req.query.style;
  var apikey = req.query.apikey;
  if (!text1) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    textvidmaker(style, text1)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/primbon/artinama", async (req, res) => {
  const nama = req.query.q;
  var apikey = req.query.apikey;
  if (!nama) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    artiNama(nama)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/primbon/artimimpi", (req, res) => {
  const mimpi = req.query.q;
  var apikey = req.query.apikey;
  if (!mimpi) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    artiMimpi(mimpi)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/primbon/jodoh", (req, res) => {
  const nama1 = req.query.nama1;
  const nama2 = req.query.nama2;
  var apikey = req.query.apikey;
  if (!nama1 || !nama2) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    ramalJodoh(nama1, nama2)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/primbon/nomor-hoki", (req, res) => {
  const nomor = req.query.nomor || req.query.q;
  var apikey = req.query.apikey;
  if (!nomor) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    nomorHoki(nomor)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * INSTAGRAM
 */

router.get("/ig/stalk", (req, res) => {
  const username =
    req.query.u || req.query.username || req.query.user || req.query.q;
  var apikey = req.query.apikey;
  if (!username) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    igStalk(username)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/ig/download", (req, res) => {
  const url = req.query.url || req.query.link;
  var apikey = req.query.apikey;
  if (!url) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    igDownload(url)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * ANIME
 */

router.get("/waifu", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    anime()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * LAINYA
 */

router.get("/kapankah", async (req, res) => {
  var kapan = req.query.kapan;
  if (_.isEmpty(kapan))
    return res
      .status(400)
      .json({
        By: "NoobUser ❤ NC-PR RESTAPIs",
        status: 400,
        message: "Error. Parameter Salah, Silahkan Masukkan Parameter Kapan",
      });
  const angka = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const kaang = angka[Math.floor(Math.random() * angka.length)];
  const kapankah = [
    `${kaang} MiliDetik Lagi`,
    `${kaang} Detik Lagi`,
    `${kaang} Menit Lagi`,
    `${kaang} Jam Lagi`,
    `${kaang} Hari Lagi`,
    `${kaang} Minggu Lagi`,
    `${kaang} Bulan Lagi`,
    `${kaang} Tahun Lagi`,
    `${kaang} Abad Lagi`,
  ];
  const kapansih = kapankah[Math.floor(Math.random() * kapankah.length)];
  res
    .status(200)
    .json({ By: "NoobUser ❤ NC-PR RESTAPIs", status: 200, jawaban: kapansih });
});

router.get("/apakah", async (req, res) => {
  var apa = req.query.apa;
  if (_.isEmpty(apa))
    return res
      .status(400)
      .json({
        By: "NoobUser ❤ NC-PR RESTAPIs",
        status: 400,
        message: "Error. Parameter Salah, Silahkan Masukkan Parameter Apa",
      });
  const paa = [
    "Ya",
    "Mungkin",
    "Bisa jadi",
    "Ulangi",
    "Tidak",
    "Aku tidak mengerti",
    "Gtw",
    "YNTKTS",
    "Yo Ndak Tau Kok Tanya Saya",
    "YNTKTS\n⣿⣿⣿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠿⠿⠛⢿⣿\n⣿⣿⢡⡄⣀⣂⣀⣂⠀⠈⠹⣿⣿⡿⠉⠀⠀⣀⣤⣤⣄⠀⢀⣿\n⣿⣿⣮⡤⢋⡉⠉⠉⠙⠈⢸⣿⣿⡇⠀⠀⡀⣀⠀⠠⠈⠙⢦⣿\n⣿⣿⣿⣧⣤⣾⣷⣴⣾⣿⣿⣿⣿⣷⡀⠀⢿⣿⣶⣷⣿⣷⣶⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠘⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡙⡹⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠛⠛⠢⢽⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤⣤⣤⣄⣂⣀⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⡿⠿⢿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠉⠁⠀⠀⠀⠁⠀⠀⠙⠻⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣶⣶⠶⠿⣿⣷⠆⡀⢠⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣤⣤⣤⣷⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\nYO NDAK TAU KOK TANYA SAYA",
    "⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⡀⢀⢀⢀⢀⢀⢀⢀⢀\n⢀⢀⢀⢀⢀⢀⢀⡤⠒⠋⠉⠁⢀⠉⠉⠑⠲⢄⡀⢀⢀⢀\n⢀⢀⢀⢀⢀⠔⢁⡠⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⢢⡀⢀\n⢀⢀⢀⢠⠃⣴⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠱⡄\n⢀⢀⢠⠃⢀⣿⣧⣀⢀⢀⣀⢀⢀⢀⢀⢀⢀⢀⢀⠈⣆⠹⡀\n⢀⢀⡸⢀⢀⠹⣿⣿⣿⣿⣿⣿⣶⣶⣶⣤⡀⢀⢀⣴⡿⢀⡇\n⢀⢀⡇⢀⢀⢀⠤⣾⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⢀⡇\n⢀⢀⢱⢀⣠⣤⣶⣿⣿⣧⣉⣿⣿⡟⣃⣿⢿⡿⢀⢀⢀⢀⡇\n⢀⢀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⢀⢀⢀⢀⢀⡰⠁\n⢀⢀⢀⠘⣿⣿⣿⣿⣿⣏⡀⢀⣸⣿⣿⢀⢀⢀⢀⢀⡰⠃\n⢀⢀⢀⢀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⡏⢀⢀⢀⣠⠞⠁⢀\n⢀⢀⢀⢀⢀⢀⠈⠙⠿⢿⣿⣿⣿⣿⣇⡠⠔⠊⠁⢀⢀⢀\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀",
    "Gtw Sih",
  ];
  const aap = paa[Math.floor(Math.random() * paa.length)];
  res
    .status(200)
    .json({ By: "NoobUser ❤ NC-PR RESTAPIs", status: 200, jawaban: aap });
});

router.get("/whois", (req, res) => {
  const domain = req.query.url || req.query.domain;
  var apikey = req.query.apikey;
  if (!domain) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    whois(domain)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/genpassword", (req, res) => {
  genPassword()
    .then((data) => {
      res.send(data);
      limitAdd(apikey);
      addReq();
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/ssticker", (req, res) => {
  const nama = req.query.q || req.query.nama;
  var apikey = req.query.apikey;
  if (!nama) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    ssticker(nama)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/stickerdl", (req, res) => {
  const link = req.query.link || req.query.nama;
  var apikey = req.query.apikey;
  if (!link) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    stickerDl(link)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/gempa", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    gempa()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/webtoondt", (req, res) => {
  const link = req.query.link || req.query.url;
  var apikey = req.query.apikey;
  if (!link) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    webtoondt(link)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/webtoon", (req, res) => {
  var carijudul = req.query.carijudul || req.query.judul;
  var apikey = req.query.apikey;
  if (!carijudul) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    webtoon(carijudul)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * GAME
 */

router.get("/gtwiki", (req, res) => {
  var fandomfinder = req.query.item || req.query.fandomfinder;
  var apikey = req.query.apikey;
  if (!fandomfinder) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    gtwiki(fandomfinder)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/gtwikidetail", (req, res) => {
  var itemnya = req.query.item || req.query.itemnya;
  var apikey = req.query.apikey;
  if (!itemnya) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    gtwikidetail(itemnya)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * MEDSOS
 */

router.get("/grupwa", (req, res) => {
  var nama = req.query.carilink || req.query.judul;
  var apikey = req.query.apikey;
  if (!nama) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    grupwa(nama)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/ghuser", (req, res) => {
  var query = req.query.user || req.query.name;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    ghuser(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/mediadl", (req, res) => {
  var link = req.query.carilink || req.query.link;
  var apikey = req.query.apikey;
  if (!link) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    mediafdl(link)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/trendtwit", (req, res) => {
  var country = req.query.country || req.query.negara;
  var apikey = req.query.apikey;
  if (!country) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    trendtwit(country)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/wattpad", (req, res) => {
  var query = req.query.judul || req.query.nama;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    wattpad(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * PRIMBON
 */

router.get("/katasedih", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    katakesedihan()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/katacinta", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    katacinta()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 *BERITA
 */

router.get("/merdekaperistiwa", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    merdeka()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/kompaslatest", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    kompasTerkini()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * JADWAL TV
 */

router.get("/jadwaltv", (req, res) => {
  var apikey = req.query.apikey;
  var namachan = req.query.channeltv;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    jadwaltv(namachan)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * AGAMA
 */

router.get("/jshalat", (req, res) => {
  const daerah = req.query.kota || req.query.daerah;
  var apikey = req.query.apikey;
  if (!daerah) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    umrotik(daerah)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/alkitabharian", (req, res) => {
  var apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    alkitabharian()
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * REXDL
 */

router.get("/rexdl/search", (req, res) => {
  const apkname = req.query.q;
  var apikey = req.query.apikey;
  if (!apkname) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    searchApk(apkname)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/rexdl/get", (req, res) => {
  const url = req.query.url;
  var apikey = req.query.apikey;
  if (!url) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    getApk(url)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * ANDROID1
 */

router.get("/an1/search", (req, res) => {
  const apkname = req.query.q;
  var apikey = req.query.apikey;
  if (!apkname) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    ansearchApk(apkname)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

/**
 * YOUTUBE
 */

router.get("/yt/download", (req, res) => {
  const url = req.query.url || req.query.link;
  var apikey = req.query.apikey;
  if (!url) return res.status(404).json(loghandler.noturl);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    yDonlod(url)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/yt/play", (req, res) => {
  const query = req.query.q || req.query.query || req.query.judul;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    yPlay(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/yt/search", (req, res) => {
  const query = req.query.q || req.query.query || req.query.judul;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    ySearch(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/pinterest", (req, res) => {
  var querry = req.query.querry || req.query.name;
  var apikey = req.query.apikey;
  if (!querry) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    pinterest(querry)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/cariresep", (req, res) => {
  var query = req.query.makanan || req.query.name;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    cariresep(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/covid", (req, res) => {
  var country = req.query.country || req.query.negara;
  var apikey = req.query.apikey;
  if (!country) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    covid(country)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/bacaresep", (req, res) => {
  var query = req.query.url || req.query.link;
  var apikey = req.query.apikey;
  if (!query) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.status(403).json(loghandler.apikeylimit);
    bacaresep(query)
      .then((data) => {
        res.send(data);
        limitAdd(apikey);
        addReq();
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/brainly", (req, res) => {
  const q = req.query.q;
  var apikey = req.query.apikey;
  if (!q) return res.status(404).json(loghandler.notquery);
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    if (isLimit(apikey)) return res.sendFile(dir + "/public/403.html");
    brainly(q)
      .then((hsil) => {
        if (hsil.success === false)
          return res.json({
            status: 404,
            message: "Server Brainly tidak dapat dihubungi",
          });
        if (hsil.message === "Data not found")
          return res.json({
            status: 403,
            message: "Pertanyaan tidak ada, silahkan mengganti pertanyaan",
          });
        res.json({
          status: 200,
          message: "Pertanyaan ditemukan",
          result: JSON.stringify(hsil.data, null, 2),
        });
        limitAdd(apikey);
        addReq();
      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (listkey(apikey) === false)
    return res.status(403).json(loghandler.apikeyfalse);
});

router.get("/cekapikey", async (req, res, next) => {
  const apikey = req.query.apikey;
  if (!apikey) return res.status(403).json(loghandler.notapikey);
  if (listkey(apikey)) {
    res.json({
      status: "active",
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: "AKTIF DEK",
      totalReq: `Status : ( ${status(apikey).status} )\nUsage : ${
        status(apikey).limit
      } / ${status(apikey).batas} request`,
    });
  }
  if (listkey(apikey) === false) {
    res.sendFile(dir + "/views/404.html");
  }
});

router.use(function (req, res, next) {
  res
    .status(404)
    .set("Content-Type", "text/html")
    .sendFile(dir + "/views/404.html");
});

module.exports = router;
