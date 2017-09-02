const fs = require('fs');
const util = require('./util.js');
const routes = require('./routes.js');
const beautify = require('js-beautify').js_beautify;
const airports = require('../data/airports.json').rows;

var allRoutes = {};
var numAirports = airports.length;

function getRoutes(i) {
    if (i == numAirports) {
        util.writeFile('output/routes.json', beautify(JSON.stringify(allRoutes)));
        return;
    }

    var apt = airports[i];
    var url = 'https://www.flightradar24.com/data/airports/' + apt.iata + '/routes';

    console.log((i + 1) + '/' + numAirports + ' Fetching routes for ' + apt.iata + ' - ' + apt.name);

    util.req(url, 'text/html', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            allRoutes[apt.iata] = routes.add(body, apt.iata);
        }
        else if (error) console.log(error.message);
        else console.log('Error ' + response.statusCode);
        getRoutes(++i);
    });
}

getRoutes(0);
