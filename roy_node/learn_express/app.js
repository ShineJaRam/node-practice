const express = require('express')
const path = require('path')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요1')
    next()
}, (req, res, next) => {
    throw new Error('에러가 났어요')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.post('/', (req, res) => {
    res.send('hello express')
})

app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}`)
})

app.get('/about', (req, res) => {
    res.send('hello express')
})

app.use((req, res, next) => {
    res.send('404입니다.')
})

app.use((error, request, response, next) => {
    console.error(error)
    response.send('에러났지롱. 근데 안알랴줌')
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행')
})