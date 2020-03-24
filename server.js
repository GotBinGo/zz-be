'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

const app = express();
const url = '/data';
const creds = require('./cred.json');

app.use(bodyParser.json());
app.use('/', express.static('zz-fe/dist/zz-fe'))

app.get(url, function (req, res) {

    var auth = "Basic " + new Buffer(creds.username + ":" + creds.password).toString("base64");
    var url = "https://0f86eebe-a798-4ec5-969b-a8c5fcec4f85.eu10.cp.iot.sap/iot/processing/api/v1/tenant/43294285/measures/capabilities/d0befbd3-2e30-4671-baff-76f0a52bcb12?skip=0&top=100";

    request.get({
        url : url,
        headers : {
            "Authorization" : auth
        }
        }, function(error, response, body) {
        res.status(200).json(JSON.parse(body));
    } );
});

const PORT = process.env.PORT || 8088;

var server = app.listen(PORT, function () {

    const host = server.address().address;
    const port = server.address().port;

});
