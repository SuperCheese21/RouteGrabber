var add = function(raw, code) {
    var list = [];

    if (raw.indexOf('var arrRoutes=') === -1) {
        console.log(' No routes found');
        return list;
    }

    var routes = raw.split('var arrRoutes=')[1].split(', arrDates')[0];
    var data = JSON.parse(routes);

    console.log(' ' + data.length + ' routes found');

    for (var i = 0; i < data.length; i++) {
        list[i] = data[i].iata;
    }

    return list;
}

module.exports = {
    add: add
}
