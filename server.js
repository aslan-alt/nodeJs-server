const http = require('http');
const url = require('url')
const fs = require('fs')
const static = require('./router/index.js').static //自定义模块，用来返回对应的请求头Content-Type类型


http.createServer(function (request, response) {
    const pathName = url.parse(request.url).pathname
    console.log(pathName)
    static(request, response, './static')
    if (pathName === '/register') {
        response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
        response.end('register');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html,charset="utf-8"' });
        response.end(fs.readFileSync('./static/notFind.html'));
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');




