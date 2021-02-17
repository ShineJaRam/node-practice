require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const fs = require('fs')
const app = express()

const indexRouter = require('./routes')
const userRouter = require('./routes/user')

app.set('port', process.env.PORT || 3000)

app.set('view engine', 'html')

app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('요청 경로', express.static('실제 경로'))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true
    },
    // name: 'connect,sid'
}))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(__dirname, 'public')(req, res, next)
    } else {
        next()
    }
}) 

app.use((req, res, next) => {
    req.data = "로이의 비밀번호?!"
})

app.get('/', (req, res) => {
    req.data
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
    res.status(200).send('404입니다.')
})

app.use((error, request, response, next) => {
    response.status(200).send('에러났지롱. 근데 안알랴줌')
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행')
})