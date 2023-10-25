const express = require('express')
const memberRouter = require('./routes/member')
const boardRouter = require('./routes/board')
const app = express()



app.use(express.urlencoded({extended:true}))

app.use('/board', boardRouter)
app.use('/member', memberRouter)

app.set('port', process.env.PORT||8888)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버연결 기다리는 중...')
})