const express = require('express')
const nunjucks = require('nunjucks')
const indexRouter = require('./routes') //=> ./routes/index (index는 생략가능)
const app = express()

//html 문서 경로 , 형식
app.set('views', __dirname+'/views')
app.set('view engine', 'html')
//nunjucks 설정
nunjucks.configure('views', {
    express : app, // app(express) 객체 연결
    watch : true // html 파일이 연결되면 템플릿 엔진을 렌더링 (화면에 보여주겠다!)
})

app.use(express.urlencoded({extended:true})) //body 데이터

app.use('/', indexRouter) //localhost:8888/...

app.set('port', process.env.PORT||8888)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버연결 기다리는 중...')
})