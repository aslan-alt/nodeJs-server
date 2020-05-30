const fs = require('fs')
const url = require('url')
const path = require('path')

function getFileMime() {
    // const types = require('./mime.json')

    return JSON.parse(fs.readFileSync('./router/mime.json').toString())
}


exports.static = function (request, response, staticPath) {
    // let query = url.parse(request.url).query //可以通过url模块parse方法拿到url 后面的参数
    let pathName = url.parse(request.url).pathname//可以通过url模块parse方法拿到url 中的路径
    pathName = pathName === '/' ? '/index.html' : pathName
    if (pathName !== '/favicon.ico') {
        const extname = path.extname(pathName)//通过path 模块extname拿到后缀类型


        try {
            const data = fs.readFileSync(staticPath + pathName)

            if (data) {
                const contentType = getFileMime()
                response.writeHead(200, { 'Content-Type': `${contentType[extname]},charset="utf-8"` });
                response.end(data);
            }
        } catch (error) {

        }

    }
}





