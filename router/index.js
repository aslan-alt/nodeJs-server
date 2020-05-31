const fs = require('fs')
const url = require('url')
const path = require('path')
const ejs = require('ejs')


const login = (req,res) =>{
    ejs.renderFile('./views/login.ejs', {}, (err, data) => {
        res.writeHead(200, { 'Content-Type': '' });
        res.end(data)
    })
}
const doLogin = (req,res)=>{
    let postData = ''
    req.on('data', (data) => {
        postData += data
    })
    req.on('end', () => {
        try {
            res.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
            res.end(postData)
        } catch (error) {
            console.log(error)
        }
    })
}
const xxx = (req,res) =>{
    const { pathname: pathName, query } = url.parse(request.url, true)
    res.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
    res.end(`GET传参成功:${query.name}`)
}

const news = (req,res)=>{
    let msg = '数据库里的数据'
    let list = [
        { title: '新闻' },
        { title: '视频' },
        { title: '音乐' },
        { title: '衣服' },
        { title: '谷歌' }
    ]
    ejs.renderFile('./views/news.ejs', { msg, list }, (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
        res.end(data)
    })
}

const register = (req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html,charset="utf-8"' });
    res.end('注册');
}


function getFileMime() {
    return JSON.parse(fs.readFileSync('./router/mime.json').toString())
}


function static(request, response, staticPath) {
    // let query = url.parse(request.url).query //可以通过url模块parse方法拿到url 后面的参数
    let pathName = url.parse(request.url).pathname//可以通过url模块parse方法拿到url 中的路径
    pathName = pathName === '/' ? '/index.html' : pathName
    console.log('-------------------')
    if (pathName !== '/favicon.ico') {
        const extname = path.extname(pathName)//通过path 模块extname拿到后缀类型
        try {
            const data = fs.readFileSync('./'+staticPath + pathName)
            if (data) {
                const contentType = getFileMime()
                response.writeHead(200, { 'Content-Type': `${contentType[extname]},charset="utf-8"` });
                response.end(data);
            }
        } catch (error) {
            console.log(error)
        }
    }
}

exports.router = {
    static,
    login,
    doLogin,
    xxx,
    news,
    register
}





