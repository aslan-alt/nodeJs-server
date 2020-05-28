const http = require('http');
const url = require('url')
const fs = require('fs')
const getFileMime = require('./module/common.js').getFileMime //自定义模块，用来返回对应的请求头Content-Type类型
const path = require('path')

http.createServer(function (request, response) {
    let pathName = url.parse(request.url).pathname//可以通过url模块parse方法拿到url 中的路径
    let query = url.parse(request.url).query //可以通过url模块parse方法拿到url 后面的参数
    pathName = pathName === '/' ? '/index.html' : pathName

    if (pathName !== '/favicon.ico') {
        const extname = path.extname(pathName)//通过path 模块extname拿到后缀类型
        fs.readFile('./static' + pathName, async (error, data) => {
            const contentType = await getFileMime()

            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/html,charset="utf-8"' });

                response.end(fs.readFileSync('./static/notFind.html').toString());
            }

            response.writeHead(200, { 'Content-Type': `${contentType[extname]},charset="utf-8"` });
            response.end(data);
        })
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');




