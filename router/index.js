const fs = require('fs')
const url = require('url')
const path = require('path')

function getFileMime() {
    // const types = require('./mime.json')
    return new Promise((resolve, reject) => {
        let string = ''
        const text = fs.readFileSync('./router/mime.json')
        text.on('data', (data) => {
            string += data.toString()
        })
        text.on('end', () => {
            resolve(JSON.parse(string))
        })
        text.on('error', (error) => {
            reject(error)
        })
    })
}
async function getFileMime2(){
    const mime = await getFileMime()
    return  mime
}

exports.static = function (request, response, staticPath) {
    // let query = url.parse(request.url).query //可以通过url模块parse方法拿到url 后面的参数
    let pathName = url.parse(request.url).pathname//可以通过url模块parse方法拿到url 中的路径
    pathName = pathName === '/' ? '/index.html' : pathName
    if (pathName !== '/favicon.ico') {
        const extname = path.extname(pathName)//通过path 模块extname拿到后缀类型

        
        try{
            const data = fs.readFileSync(staticPath + pathName)
            if (data) {
                const contentType = getFileMime2()
                response.writeHead(200, { 'Content-Type': `${contentType[extname]},charset="utf-8"` });
                response.end(data);
            }
        }catch(error){
            
        }
        
    }
}





