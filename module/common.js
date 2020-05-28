const fs = require('fs')
exports.getFileMime = function () {
    // const types = require('./mime.json')
    return new Promise((resolve, reject) => {
        let string = ''
        const text = fs.createReadStream('./module/mime.json')
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

