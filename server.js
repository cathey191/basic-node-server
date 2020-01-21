var https = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
https.createServer((req, res) => {
    let requestUrl = url.parse(req.url).path;
    console.log('handling request for', requestUrl);
    if (requestUrl === '/') {
        requestUrl = 'index.html';
    }
    let timeout = 0;
    if (requestUrl.includes('.js')) {
        timeout = 5000;
    }

    setTimeout(() => {
        fs.readFile(path.join(__dirname, 'public', requestUrl), (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end();
                return;
            }
            res.write(data.toString());
            res.end();
        });
    }, timeout);

}).listen(3000);
