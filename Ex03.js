const express = require('express')
const app = express()

//정적 리소스 경로 지정(이미지, css,js...)

app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Ex03image.html')
})




app.set('port', process.env.PORT || 8888)
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 서버연결 기다리는 중...');
})