


console.log('我是js文件')
const button = document.getElementById('getJson')
function ajax(method, url) {
    return new Promise((resolve, reject) => {
        const requests = new XMLHttpRequest()
        requests.open(method, url)
        requests.onreadystatechange = () => {
            if (requests.readyState === 4 && requests.status === 200) {
                resolve(requests.response)
            }
            requests.onerror = (error) => {
                reject(error)
            }
        }
        requests.send()
    })
}

button.onclick = () => {

    ajax('GET', 'http://127.0.0.1:8081/data.json').then(res => console.log(res))
}