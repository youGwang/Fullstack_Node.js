const express = require('express')
const indexRouter = require('./routes') // ./routes/index
const nunjucks = require('nunjucks')
const webSocket = require('./socket')
const chatRouter = require('./routes/chat')
const {sequelize} = require('./models')
const app = express()
const memberRouter = require('./routes/member')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileStore = require('session-file-store')(session)



app.use(session({
    secret : 'secretkey' , //암호화 키설정
    store : new fileStore()
}))

app.use(express.urlencoded({extended:true})) // body 데이터 가져올 때 추가
app.use(bodyParser.json()) //json 데이터 


//force : false -> 기존 테이블은 건들지 않음
sequelize.sync({force : false})
.then(()=>{
    console.log("DB 연결성공!")
})
.catch((err)=>{
    console.log(err)
})

//정적리소스 경로 지정(css, js(front-end) ...)
app.use(express.static(__dirname+'/public'))

app.set('views', __dirname+'/views')
app.set('view engine', 'html')
nunjucks.configure('views', {
    express : app,
    watch : true
})


app.use('/', indexRouter)
app.use('/member', memberRouter)
app.use('/chat', chatRouter)

app.set('port', process.env.PORT||8888)
const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중...')
})

webSocket(server, app)

