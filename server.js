const http = require('http');
const url = require('url')
const fs = require('fs')
const ejs = require('ejs')
const static = require('./router/index.js').static //自定义模块，用来返回对应的请求头Content-Type类型


http.createServer(function (request, response) {
    console.log(request.url)
    // console.log(request.method)
    const { pathname: pathName, query } = url.parse(request.url, true)
    // console.log(query)

    static(request, response, './static')
    if (pathName === '/register') {
        response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
        response.end('注册');
    } else if (pathName === '/news') {
        let msg = '数据库里的数据'
        let list = [
            { title: '新闻' },
            { title: '视频' },
            { title: '音乐' },
            { title: '衣服' },
            { title: '谷歌' }
        ]
        ejs.renderFile('./views/news.ejs', { msg, list }, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
            response.end(data)
        })
    }
    else if (pathName === '/login.html') {//登录页面
        ejs.renderFile('./views/login.ejs', {}, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
            response.end(data)
        })
    } else if (pathName === '/doLogin') {
        let postData = ''
        request.on('data', (data) => {
            postData += data
        })
        request.on('end', () => {
           
            try {
                response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
                response.end(postData)
            } catch (error) {
                console.log(error)
               
            }

        })

    }
    else if (pathName === '/query') {
        response.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
        response.end(`GET传参成功:${query.name}`)

    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html,charset="utf-8"' });
        response.end(fs.readFileSync('./static/notFind.html'));
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');




