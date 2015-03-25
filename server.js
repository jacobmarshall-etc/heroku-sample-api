var API_URL = 'http://ws.audioscrobbler.com/2.0/' +
    '?method=user.getrecenttracks&user=%s&api_key=%s&format=json';

var util = require('util');
var express = require('express');
var agent = require('superagent');

var app = express();

app.get('/latest', function (req, res) {
    var url = util.format(API_URL, process.env.API_USER, process.env.API_KEY);

    agent
        .get(url)
        .end(function (err, _res) {
            res.set('Access-Control-Allow-Origin', '*');

            res.send({
                error: err,
                result: _res.body.recenttracks.track[0]
            });
        });
});

app.listen(process.env.PORT || 8000);
