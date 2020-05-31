const http = require('http');
const url = require('url')
const fs = require('fs')
const router = require('./router/index.js').router



http.createServer(function (req, res) {
  
    // console.log(request.method)
    let pathName = url.parse(req.url).pathname
    pathName = pathName === '/' ? 'static' : pathName.replace('/', '')
    console.log(pathName)
    // console.log(query)

    try {
        router[pathName](req, res,pathName)
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html,charset="utf-8"' });
        res.end(fs.readFileSync('./static/notFind.html'));
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');




