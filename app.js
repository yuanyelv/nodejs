const querystring = require('querystring')

const handleBlogRoute = require('./src/routes/blog')

// A对请求数据进行处理《------
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        // if(req.headers['content-Type'] !== 'application/json'){
        //     resolve({})
        //     return
        // }
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
            console.log('1postData:',postData)
        })
        req.on ('end',() => {
            if(!postData) {
                resolve({})
                return
            }
            console.log('2postData:',postData)
            resolve(
                
                JSON.parse(postData)
            )
            console.log('3postData:',postData)
        })
    })
    return promise
}

// 对www.js的http.createServer((req,res) <----- 进行封装
const serverHandler = (req, res) => {
    // 设置响应格式
    res.setHeader('Content-Type', 'application/json')

    // 获取req.path and req.query
    const url =req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.path)
    console.log(req.query)
    console.log(req.method)

    // A对请求数据POST进行处理---》
    // 返回的是promise then就是对promise内部进行处理 这里是对postData进行处理
    getPostData(req).then((postData) => {
        console.log('3postData:',postData)
        // postData 赋值给req.body
        req.body = postData
        console.log('4req.body:',req.body)

        // B 相关路由-----》
        const blogDataPromise = handleBlogRoute(req, res)
        if(blogDataPromise) {
            blogDataPromise.then((blogData) => {
                res.end(JSON.stringify(blogData))
            })
            return
        }
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write( '404 Not Found')
        res.end()
    })
}

module.exports = serverHandler