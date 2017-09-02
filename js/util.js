const fs = require('fs');
const request = require('request');

// performs HTTP request
var req = function(url, type, callback) {
    var options = {
        url: url,
        headers: {
            'Accept': type,
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'DNT': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
        },
        'gzip': true
    };

    request(options, callback);
}

// writes data to a file
var writeFile = function(file, data) {
    fs.writeFile(file, data, (error) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log(' Data written to ' + file);
        }
    });
};

// converts a data array to delimiter separated format
var addDSVLine = function(data, delimiter) {
    var line = '';

    for (var i = 0; i < data.length; i++) {
        line += data[i];
        if (i < data.length - 1) line += delimiter;
    }

    return line + '\n';
};

module.exports = {
    req: req,
    writeFile: writeFile,
    addDSVLine: addDSVLine
};
