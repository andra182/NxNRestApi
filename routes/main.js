dir = process.cwd()
const speed = require('performance-now')
var express = require('express');
var router = express.Router();

router.get('/docs', (req, res) => {
    res.sendFile(dir + '/views/docs.html')
})
router.get('/', (req, res) => {
    res.sendFile(dir + '/views/index.html')
})

router.get('/other', async (req, res) => {
    res.sendFile(dir + '/views/other.html')
})

router.get('/primbon', async (req, res) => {
    res.sendFile(dir + '/views/primbon.html')
})

router.get('/stalking', async (req, res) => {
    res.sendFile(dir + '/views/stalking.html')
})

router.get('/downloader', async (req, res) => {
    res.sendFile(dir + '/views/downloader.html')
})

router.get('/berita', async (req, res) => {
    res.sendFile(dir + '/views/berita.html')
})

router.get('/religion', async (req, res) => {
    res.sendFile(dir + '/views/religion.html')
})

router.get('/search', async (req, res) => {
    res.sendFile(dir + '/views/search.html')
})

router.get('/maker', async (req, res) => {
    res.sendFile(dir + '/views/maker.html')
})

module.exports = router
