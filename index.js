var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
const axios = require('axios');
var cheerio = require('cheerio');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
async function doRequest(url) {
    return new Promise(function (resolve, reject) {
        axios.get(url).then((response) => {
            resolve(response.data);
        }).catch(error => reject(error));
    });
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}
app.get('/corona', async (req, res) => {
    var randomid=Math.random().toString(26).slice(2);
    let url = `https://vnexpress.net/microservice/corona?id=${randomid}`;
    var html = await doRequest(url);
    return res.send(html);
});

var server = app.listen(3004, function () {
    console.log('Magic happens on port 3004 ');
});
exports = module.exports = app;